# from prlist import PListApp, PListModule, PListSubModule, PListFeature
import pandas as pd
import pprint as pp
from oauth2client.service_account import ServiceAccountCredentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
import math
import json
from collections import OrderedDict
import logging
import copy
import io


class FileProvider:

	def __init__(self, filepath):
		"""Given a filepath load that file as Excel file"""
		self.source = pd.ExcelFile(filepath)

	def getsheet(self, sheetname):
		return self.source.parse(sheetname)

class GoogleDriveProvider(FileProvider):

	def __init__(self, file_id):
		"""Given a google drive file_id, load it as Excelfile"""
		scope = [
			'https://spreadsheets.google.com/feeds',
         	'https://www.googleapis.com/auth/drive'
		]
		credentials = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
		service = build('drive', 'v3', credentials=credentials, cache_discovery=False)
		request = service.files().export_media(fileId=file_id, mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
		fh = io.BytesIO()
		downloader = MediaIoBaseDownload(fh, request)
		done = False
		while done is False:
			status, done = downloader.next_chunk()
			print("Download %d%%." % int(status.progress() * 100))
		self.source = pd.ExcelFile(fh)


class SheetDataParser(object):

	logger = logging.getLogger('SheetDataParser')

	def columnConfiguration(self, headers, rawData):
		index = 0
		columnMapping = {}

		for each in headers[1:]:
			index += 1
			#hack to remove empty column heads. pandas set headers as Unnamed 1, Unnamed 2... style
			if each.startswith('Unnamed'): continue
			columnMapping[each.strip()] = index

		# has submodule column (as of code on SDM-SI uses this feature)
		hasSubmodule = self.hasSubmoduleColumn(rawData)

		featureColumn = 4 if hasSubmodule else 3

		return hasSubmodule, featureColumn, columnMapping

	def parse(self, rawData, headers):
		self.logger.debug('Parsing raw data')

		appName = headers[0]

		hasSubmodule, featureColumn, columnMapping = self.columnConfiguration(headers, rawData)

		self.logger.debug('Found Sheet Title `%s`, hasSubmodule = %s, Feature Column = %d' % (appName, hasSubmodule, featureColumn) )
		self.logger.debug('Found Description and Pricing Columns `%s`' % (str(columnMapping)) )

		structuredData = self.buildTreeStructure(appName, rawData, hasSubmodule, featureColumn, columnMapping)

		return appName, structuredData

	def hasValue(self, cellValue):
		return not (isinstance(cellValue, float) and math.isnan(cellValue))



	def hasSubmoduleColumn(self, rawData):
		i = 0
		for row in rawData:
			if row[3] == 'Lowest Price':
				return False
			elif row[4] == 'Lowest Price':
				return True

			if row[3] == 'Highest Price':
				return False
			elif row[4] == 'Highest Price':
				return True

			i = i+1

			if i == 10:
				raise Exception("Unable to determine if there is Submodule Column. (Cannot find Highest Price or Lowest Price")


	_name_cache = {}
	def setNestedValue(self, target, name, value):
		if name not in self._name_cache:
			parts = name.split('.')
			self._name_cache[name] = parts
		else:
			parts = self._name_cache[name]

		obj = target
		for each in parts[:-1]:
			if each not in obj:
				obj[each] = {}
			obj = obj[each]

		obj[parts[-1]] = value


	def processRawDataAdditionalColumns(self, row, columnMapping):
		values = {}

		for name, index in columnMapping.items():

			if len(row) <= index: continue
			if not self.hasValue(row[index]): continue

			self.setNestedValue(values, name, row[index])

		return values


	def buildMultipliers(self, row, columnMapping):
		values = {}

		for name, index in columnMapping.items():

			if len(row) <= index: continue
			if not self.hasValue(row[index]): continue

			self.setNestedValue(values, name, row[index])

		values['price']['description'] = values['description']

		values = values['price']

		values['code'], values['increment'] = values['multiplier'].split(':')
		values['label'] = values['description']

		slabs = []
		for i in range(1,11):
			v = values.get('slab'+str(i))
			if v is not None:
				slabs.append(v)
				del values['slab'+str(i)]
		values['slabs'] = slabs

		del values['multiplier']
		del values['description']

		return values

	def rawDatatoList(self, appName, rawData, hasSubmodule, featureColumn, columnMapping):
		moduleGroup = None
		moduleGroupName = None
		moduleCode = None
		moduleName = None
		subModule = None
		feature = None

		multipliers = []

		for row in rawData:
			if isinstance(row[0], str) or not math.isnan(row[0]):
				moduleGroupName = row[0]
				moduleGroup = ''.join([x[0] for x in moduleGroupName.split()])
				moduleCode, moduleName, subModule, feature = None, None, None, None
			elif isinstance(row[1], str) or not math.isnan(row[1]):
				moduleCode, moduleName = row[1], row[2]
				subModule, feature = None, None
			elif hasSubmodule and (isinstance(row[3], str) or not math.isnan(row[3])):
				subModule = row[3]
				feature = None
			elif isinstance(row[featureColumn], str) or not math.isnan(row[featureColumn]):
				feature = row[featureColumn]
			else:
				continue


			if feature == 'slab':
				multiplier = self.buildMultipliers(row, columnMapping)
				multipliers.append(multiplier)


			# skip highest price / lowest price rows
			if feature is not None and moduleCode is None:
				continue

			additionalValues = self.processRawDataAdditionalColumns(row, columnMapping)

			if moduleGroup is not None and feature is None and moduleCode is None and subModule is None:

				additionalValues['multipliers'] = copy.deepcopy(multipliers)

				for each in additionalValues['multipliers']:
					each['name'] = 'params.' + each['code'] + '.' + moduleGroup
				#print ('setting addtional values', moduleGroup, multipliers)


			data = dict(moduleGroup=moduleGroup, moduleGroupName=moduleGroupName, moduleCode=moduleCode, moduleName=moduleName, subModule=subModule, feature=feature, values=additionalValues)
			#print('found row', data)
			yield data

	def buildTreeStructure(self, appName, rawData, hasSubmodule, featureColumn, columnMapping):

		listData = self.rawDatatoList(appName, rawData, hasSubmodule, featureColumn, columnMapping)


		self.logger.debug('Building Tree Structure')
		moduleGroupList = []
		moduleList = []

		finalData = OrderedDict()

		for each in listData:
			if each['feature'] is not None:
				# feature found
				featureData = OrderedDict()
				featureData['name'] = each['feature']
				featureData.update(each['values'])

				if each['subModule'] is not None:
					finalData[each['moduleGroup']]['modules'][each['moduleCode']]['submodules'][each['subModule']]['features'][each['feature']] = featureData
				else:
					finalData[each['moduleGroup']]['modules'][each['moduleCode']]['features'][each['feature']] = featureData
			elif each['subModule'] is not None:

				subModuleData = OrderedDict()
				subModuleData['name'] = each['subModule']
				subModuleData['features'] = OrderedDict()
				subModuleData.update(each['values'])

				finalData[each['moduleGroup']]['modules'][each['moduleCode']]['submodules'][each['subModule']] = subModuleData

			elif each['moduleCode'] is not None:
				moduleList.append(each['moduleCode'])

				moduleData = OrderedDict()
				moduleData['code'] = each['moduleCode']
				moduleData['name'] = each['moduleName']
				moduleData['submodules'] = OrderedDict()
				moduleData['features'] = OrderedDict()

				moduleData.update(each['values'])

				finalData[each['moduleGroup']]['modules'][each['moduleCode']] = moduleData

				# finalData[each['moduleGroup']][each['moduleCode']] = OrderedDict
			elif each['moduleGroup'] is not None:
				moduleGroupList.append(each['moduleGroup'])

				moduleGroupData = OrderedDict()
				moduleGroupData['name'] = each['moduleGroupName']
				moduleGroupData['code'] = each['moduleGroup']
				moduleGroupData['modules'] = OrderedDict()

				moduleGroupData.update(each['values'])

				finalData[each['moduleGroup']] = moduleGroupData


		return finalData





# {
# 	ModuleGroup: {
# 		name: ModuleGroup,
# 		modules: {
# 			Module:
# 				{
# 					code: moduleCode
# 					name: moduleName
# 					submodules: {
# 						SubModule:
# 						 {
# 						 	name:
# 						 	features: {
# 						 		Feature: {},
# 						 		Feature: {}
# 						 	}
# 						 }
# 					},
# 					features: {
# 				 		Feature: {},
# 				 		Feature: {}
# 					}
# 				}

# 		}
# 	}
# }


# 		module
# 			subModule
# 				Feature

class JsonDataExporter(object):

	logger = logging.getLogger('JsonDataExporter')

	def prepareData(self, data):
		for sheetName, structuredData in data.items():
			for mgk, mgv in structuredData['moduleGroups'].items():
				for mk, mv in mgv['modules'].items():
					for smk, smv in mv['submodules'].items():
						smv['features'] = list(smv['features'].values())
					mv['features'] = list(mv['features'].values())
					mv['submodules'] = list(mv['submodules'].values())

				mgv['modules'] = list(mgv['modules'].values())
			structuredData['moduleGroups'] = list(structuredData['moduleGroups'].values())

		return list(data.values())


	def export(self, data, filePath):
		preparedData = self.prepareData(data)
		self.write(preparedData, filePath)

	def getContent(self, data):
		return json.dumps(data, indent=2)

	def write(self, data, filePath):

		with open(filePath, 'w') as fp:
			fp.write(self.getContent(data))


class JsDataExporter(JsonDataExporter):

	logger = logging.getLogger('JsDataExporter')

	def getContent(self, data):
		jsonData = json.dumps(data, indent=2)
		return "const data = " + jsonData + ";\n\nexport default data;"

class PricingDataPrinter(object):

	def rest(self, values):
		return [k + '=' + str(v) for k,v in values.items() if k not in ('name', 'code', 'description', 'ready', 'modules', 'features', 'submodules')]

	def export(self, data):
		for sheetName, structuredData in data.items():
			print (sheetName, ':', structuredData['name'])
			for mgk, mgv in structuredData['moduleGroups'].items():
				print(' ' * 4, mgk)
				for mk, mv in mgv['modules'].items():
					print (' ' * 8, mk, ':', mv['name'], mv.get('description'), self.rest(mv))
					for smk, smv in mv['submodules'].items():
						print (' ' * 12, smk, smv.get('description'), self.rest(smv))
						for fk, fv in smv['features'].items():
							print (' ' * 16, fk, fv.get('description'), self.rest(fv))
					for fk, fv in mv['features'].items():
						print (' ' * 12, fk, fv.get('description'), self.rest(fv))


class ExcelDataParser(object):

	logger = logging.getLogger('ExcelDataParser')

	def readSheet(self, sheet):
		sheet = sheet.dropna(axis=0, how='all', thresh=None, subset=None, inplace=False)
		data = []
		for index, row in sheet.iterrows():
			data.append([each for each in row])

		return data


	def parseSheet(self, sheet):
		rawData = self.readSheet(sheet)
		sdp = SheetDataParser()
		appName, structuredData = sdp.parse(rawData, sheet.columns)
		return appName, structuredData


	def fromProvider(self, provider, sheetNameList=[]):

		# sheet 4 = SDM
		# sheet_name = source.sheet_names[3]
		# print (sheet_name)
		# if (sheet_name != 'SDM'):
		#     raise Exception("Only sdm tested")
		finalData = OrderedDict()

		for sheetName in sheetNameList:
			self.logger.debug('Processing Sheet `%s`' % sheetName)

			sheet = provider.getsheet(sheetName)

			appName, structuredData = self.parseSheet(sheet)

			finalData[sheetName] = {
				'code': sheetName,
				'name': appName,
				'moduleGroups': structuredData
			}

			self.logger.debug('Processing Complete for `%s`' % sheetName)

		return finalData


def main():
	# excel_file = '../PrismPricing5.xlsx'
	logging.basicConfig(level=logging.DEBUG)

	# provider = FileProvider("./PrismPricing3.xlsx")
	provider = GoogleDriveProvider("1UQvOaR5J4-epphVa31fZg3Z5FexhiJ6Mucxb_M25JRE")

	excelDataParser = ExcelDataParser()
	##data = excelDataParser.parseFile(filePath, ['FMS'])
	data = excelDataParser.fromProvider(provider, ['FMS', 'SDM', 'CRM', 'SCM', 'HCM'])

	PricingDataPrinter().export(data)

	JsonDataExporter().export(data, '../../public/ProductList.json')

if __name__== '__main__':
	main()

# label = {'module': 0, 'sub_module_abrv': 1, 'sub_module_full_name': 2, 'features': 3}
# temp = dict()
# records = dict()




# def prepare_data(temp, records):
#     for i in range(4):
#         for index, row in page.iterrows():
#             if str(row[i]) != 'nan':
#                 temp.update({index: str(row[i])})
#         records.update({i: temp.copy()})
#         temp.clear()


# def insert_db(obj):
#     session.add(obj)
#     session.flush()
#     return obj.id


# def insert_app(name, status):
#     new_app = PListApp(name, status)
#     return insert_db(new_app)


# def insert_module(name, status, app_id):
#     new_module = PListModule(name, status, app_id)
#     return insert_db(new_module)


# def insert_sub_module(name, status, module_id):
#     new_sub_module = PListSubModule(name, status, module_id)
#     return insert_db(new_sub_module)


# def insert_feature(name, status, sub_module_id):
#     new_feature_id = PListFeature(name, status, sub_module_id)
#     return insert_db(new_feature_id)


# def insert_data():
#     prepare_data()
#     modules = sorted(records[0].iteritems())
#     sub_modules = sorted(records[2].iteritems())
#     features = sorted(records[3].iteritems())

#     app_id = insert_app(app_name, 1)

#     for i in xrange(len(modules)):
#         # insert module
#         module_name = modules[i][1]
#         module_id = insert_module(module_name, 1, app_id)

#         li_module = modules[i][0]
#         ui_module = None

#         if i == len(modules) - 1:
#             ui_module = None
#         else:
#             ui_module = modules[i + 1][0]

#         temp_sub_modules = [sub_modules[x] for x in range(len(sub_modules)) if
#                             sub_modules[x][0] > li_module and sub_modules[x][0] < (
#                                 ui_module if ui_module != None else sub_modules[-1][0]) + 1]

#         for j in xrange(len(temp_sub_modules)):
#             # insert sub module
#             sub_module_name = temp_sub_modules[j][1]
#             sub_module_id = insert_sub_module(sub_module_name, 1, module_id)

#             li_sub_module = temp_sub_modules[j][0]
#             ui_sub_module = None

#             if j == len(temp_sub_modules) - 1:
#                 ui_sub_module = ui_module
#             else:
#                 ui_sub_module = temp_sub_modules[j + 1][0]

#             temp_feature_list = [features[y] for y in range(len(features)) if
#                                  features[y][0] > li_sub_module and features[y][0] < (
#                                      ui_sub_module if ui_sub_module != None else features[-1][0]) + 1]

#             for k in range(len(temp_feature_list)):
#                 feature_name = temp_feature_list[k][1]
#                 feature_id = insert_feature(feature_name, 1, sub_module_id)


# raw_list_data = read_data(file_path)
# dict_prepared_data = prepare_data_in_intermediate_format(raw_list_data)

# table_wise_data_dict = prepare_data_for_db(dict_prepared_data)
# insert_in_db(table_wise_data_dict)

# insert_data()
# session.commit()





# insert_data()
# def insert_data():
#
#     for level in xrange(4):
#         modules = records[level]
#         keys = sorted(modules.keys())
#
#         for index in xrange(len(keys)):
#             key = keys[index]
#             lower_limit = key+1
#             upper_limit = None
#
#             if len(keys)-1 != index:
#                 upper_limit = keys[index+1]-1
#
#             print lower_limit, upper_limit
#pp.pprint(records)
