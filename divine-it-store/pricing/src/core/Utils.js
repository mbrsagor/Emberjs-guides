export const GLOBAL = 'START';

export const buildMultipliers = (ProductList) => {

    let multipliers = {};
    const multipliersByApp = {};
    //multipliersByApp[GLOBAL] = [];

    for (const app in ProductList) {
      
      const appCode = ProductList[app].code;
      multipliersByApp[appCode] = [];

      for (const mg in ProductList[app].moduleGroups) {
        for (const i in ProductList[app].moduleGroups[mg].multipliers) {
          const m = ProductList[app].moduleGroups[mg].multipliers[i];

          if (undefined !== multipliers[m.code]) {
            // if (multipliers[m.code].app !== appCode)
            //   multipliers[m.code].app = GLOBAL;
            continue;
          }

          let o = {};
          for (let k in m) {
            o[k] = m[k];
          }
          o.name = 'params.' + m.code;
          o.app = appCode;
          multipliers[m.code] = o;
        }
      }
    }
    
    for (const each in multipliers) {
      const app = multipliers[each].app;
      multipliersByApp[app].push(multipliers[each]);
    }
    return multipliersByApp;
}
const allProducts = {};
const successors = {};
const ancestors  = {};

export const Dependencies = {
  getAncestors: function(codeList) {
    const allAncestors = {};
    for (const each in codeList) {
      for (const a in ancestors[codeList[each]]) {
        allAncestors[ancestors[codeList[each]][a]] = true;
      }
    }

    //console.log(codeList, allAncestors, ancestors);
    return Object.keys(allAncestors);
  },

  getSuccessors: function(codeList) {
    const allSuccessors = {};
    for (const each in codeList) {
      for (const s in successors[codeList[each]]) {
        allSuccessors[successors[codeList[each]][s]] = true;
      }
    }
    //console.log(codeList, allAncestors, ancestors);
    return Object.keys(allSuccessors);
  },

  traceDependencies: function(each) {

    const queue = [];
    queue.push(each);

    let safeguard = 1000;

    const allDependencies = {};

    while (queue.length) {
      
      safeguard --;
      
      if (!safeguard) {
        console.log('dependency tracing is not complete in', safeguard, 'iterations. Possible Cycle');
        console.log('Initiated by ', each);
        console.log('Current Queue', queue);
        throw "Cyclic Dependency Error";
      }

      const next = queue.pop();

      if (ancestors[next]) {
        for (const i in ancestors[next]) {
          //if (ancestors[next][i] == next) continue;
          allDependencies[ancestors[next][i]] = true;
        }
      }
      else {
        allDependencies[next] = true;

        const dependencies = allProducts[next].dependencies;

        for (const d in dependencies) {
          // console.log('d', next, dependencies[d], allDependencies[d]);
          if (!allDependencies[dependencies[d]]) {
              queue.push(dependencies[d]);
          }
        }
      }
    } 
    return allDependencies;
  },
  traceDependenciesForAll: function() {
    //console.log(allProducts);

    for (const each in allProducts) {
        successors[each] = {};
        // check if already done through another dependency
        if (ancestors[each]) continue;
        const allDependencies = Dependencies.traceDependencies(each);
        ancestors[each] = Object.keys(allDependencies);
    }

    for (const each in allProducts) {
      for (const a in ancestors[each]) {
        //if (ancestors[each][a] == each) continue;
        //console.log(ancestors[each][a], each);
        successors[ancestors[each][a]][each] = true;
      }
    }

    for (const each in allProducts) {
      successors[each] = Object.keys(successors[each]);
    }

    //console.log('ancestors', ancestors);
    //console.log('successors', successors);

    // for (const d in allDependencies) {
      // allSuccessors[d]
    // }
    //console.log(ancestors);
  },
  buildDependencies: function(ProductList) {
    for (const app in ProductList) {
      for (const mg in ProductList[app].moduleGroups) {
        for (const m in ProductList[app].moduleGroups[mg].modules) {
          allProducts[ProductList[app].moduleGroups[mg].modules[m].code] = ProductList[app].moduleGroups[mg].modules[m];

          for (const sbm in ProductList[app].moduleGroups[mg].modules[m].submodules) {
            allProducts[ProductList[app].moduleGroups[mg].modules[m].submodules[sbm].code] = ProductList[app].moduleGroups[mg].modules[m].submodules[sbm];

            for (const f in ProductList[app].moduleGroups[mg].modules[m].submodules[sbm].features) {
              allProducts[ProductList[app].moduleGroups[mg].modules[m].submodules[sbm].features[f].code] = ProductList[app].moduleGroups[mg].modules[m].submodules[sbm].features[f];
            }
          }

          for (const f in ProductList[app].moduleGroups[mg].modules[m].features) {
            allProducts[ProductList[app].moduleGroups[mg].modules[m].features[f].code] = ProductList[app].moduleGroups[mg].modules[m].features[f];
          }
        }
      }
    }

    Dependencies.traceDependenciesForAll();
  }
}



export const defaultParams = (multipliersByApp) => {
    
    let params = {}
    for (const app in multipliersByApp) {
      for (const each in multipliersByApp[app]) {
        const multiplier = multipliersByApp[app][each];
        if (multiplier.slabConfig.paramType == 'pip') continue;
        //console.log(multiplier);
        params[multiplier.name] = multiplier.slabs[0];

      }
    }
    return params;
}

