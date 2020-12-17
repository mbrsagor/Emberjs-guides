import logging
from pyapp.readxl import GoogleDriveProvider, FileProvider, ExcelDataParser, PricingDataPrinter, \
    JsonDataExporter


def main():
    # excel_file = '../PrismPricing5.xlsx'
    logging.basicConfig(level=logging.DEBUG)

    # provider = FileProvider("./PrismPricing3.xlsx")
    provider = GoogleDriveProvider("1UQvOaR5J4-epphVa31fZg3Z5FexhiJ6Mucxb_M25JRE")

    excelDataParser = ExcelDataParser()
    # data = excelDataParser.parseFile(filePath, ['FMS'])
    data = excelDataParser.fromProvider(provider, 
        ['START', 'FMS', 'SDM', 'CRM', 'SCM', 'HCM', 'PPC', 'EAM', 'CSC', 'PIP'])

    PricingDataPrinter().export(data)

    JsonDataExporter().export(data, './public/ProductList.json')


if __name__ == '__main__':
    main()
