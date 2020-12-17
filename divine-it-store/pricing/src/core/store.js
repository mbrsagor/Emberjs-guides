import createStore from 'unistore'
import {SOFTWARE} from "./ItemConfig";
import calculate_price, {calculate_price_pip_change} from './PricingCalc';
import {buildMultipliers, defaultParams, Dependencies} from './Utils';


let store = createStore({
    version: 1,
    isFullScreen: false,
    user: {
      authenticated: true,
      emailVerified: true
    },
    configData: [],
    multipliers: {},
    global: {
        'domain': 'www.divineit.net',
        'customerRef': 'Divine IT Limited - ZubaiR'
    },
    params: {
    },
    paramConfig: {
    },
    pip: {},
    cartItems: [],
    PricingParameters: [],
    cartConfig: {
        calculations: {},
        sections: {
            USER: {
                hide: true   
            },
            SOFTWARE: {
                includeUser: true
            }
        }
    },

    groupCount: {

    },
    cart: {},

    showUnauthenticatedUserPopup: false
})

const process_result = (new_state, result) => {
    // console.log('calculating price', result);
    if (undefined !== result.paramConfig) {
        return {...new_state, ...{ cart: result.cart, paramConfig: result.paramConfig}}
    }
    else {
        return {...new_state, ...{ cart: result.cart}}
    }
}

const update_cart_wrapper = (fnc) => {
    return (...args) => {
        const new_state = fnc(...args)
        // console.log(JSON.stringify(new_state.paramConfig));
        const result = calculate_price(new_state.cart, new_state.cartItems, new_state.configData, new_state.params, new_state.pip, new_state.paramConfig);
        // console.log(JSON.stringify(result.paramConfig));

        return process_result(new_state, result);
    }
}

const update_pip_wrapper = (fnc) => {
    return (...args) => {
        const new_state = fnc(...args)
        
        //console.log(args);
        const result = calculate_price_pip_change(
            new_state.cart, 
            new_state.cartItems, 
            new_state.configData, 
            new_state.params, 
            new_state.pip, 
            new_state.paramConfig,
            args.length == 4 ? args[3] : undefined
        );
        // console.log(JSON.stringify(result.paramConfig));

        return process_result(new_state, result);
    }
}


const wrap_actions = (actions, wrapper) => {
    let wrapped_actions = {}
    for (let key in actions){
       if(actions.hasOwnProperty(key)){
           wrapped_actions[key] = wrapper(actions[key])
       }
    }
    return wrapped_actions;
}

const cart_related_actions = {

    initialize(state, initState) {
        const multipliers = buildMultipliers(initState.configData);
        Dependencies.buildDependencies(initState.configData);

        const params = defaultParams(multipliers);
        for (const each in state.params) {
            params[each] = state.params[each];
        }
        return { ...state, ...initState, multipliers: multipliers, params: params}
    },

    addToCart(state, priceItem, price) {
        // console.log('adding item', priceItem.code, price);
        const newItem = {
            type: SOFTWARE,
            code: priceItem.code,
            name: priceItem.name,
            app: priceItem.app,
            parameter1: null,
            unitPrice: null,
            freeUnit: 0,
            freeprice: 0.0,
            price: price
        }
        if (true === priceItem.isModule) {
            const appId = priceItem.app;
            const groupId = priceItem.app + '-' + priceItem.group;
            const newGroupCountValue = (state.groupCount[groupId] || 0) + 1;
            return {...state, ...{
                cartItems: [...state.cartItems, newItem], 
                groupCount: {...state.groupCount, [groupId]: newGroupCountValue}}
            };
        }
        else {
            return {...state, ...{
                cartItems: [...state.cartItems, newItem]
            }};
        }
    },

    clearCart(state) {
       return {...state, ...{cartItems: []}}
    },

    removeFromCart(state, priceItem) {
        if (true === priceItem.isModule) {
            const appId = priceItem.app;
            const groupId = priceItem.app + '-' + priceItem.group;
            const newGroupCountValue = (state.groupCount[groupId] || 0) - 1;
            return {...state, ...{
                cartItems: state.cartItems.filter(cartItem => cartItem.code !== priceItem.code),
                groupCount: {...state.groupCount, [groupId]: newGroupCountValue}}
            };
        }
        else {
            return {...state, ...{cartItems: state.cartItems.filter(cartItem => cartItem.code !== priceItem.code)}};
        }
    },

    updateParam(state, name, value) {
        return {...state, ...{ params: {...state.params, [name]: value} }}
    }
}

const pip_related_actions = {
    updateParamConfig(state, name, value) {
        return {...state, ...{ paramConfig: {...state.paramConfig, [name]: value} }}
    },    
    updatePip(state, name, value, options) {
        return {...state, ...{ pip: {...state.pip, [name]: value} }}
    }    
}

const priceItems = {};
const registerItem = (item) => {
    priceItems[item.props.code] = item;
    //console.log(priceItems);
}

let other_actions = {
    // actions that does not need to update cart
    viewUnauthenticatedUserPopup(state) {
        return {...state, showUnauthenticatedUserPopup:true}
    },

    hideUnauthenticatedUserPopup(state) {
        return {...state, showUnauthenticatedUserPopup:false}
    },

    toggleFullscreen(state) {
        console.log('Is fullscreen ', state.isFullScreen)
        return { ...state, isFullScreen: !state.isFullScreen }
    },

    addItems(state, action, filter) {
        const applyDependencies = state.applyDependencies;
        
        // console.log(action, filter);
        const {app, group, codeList} = filter;

        const baseItems = [];

        //console.log(action, filter, app, group, codeList);

        if (undefined !== codeList) {
            for (const code in codeList) baseItems.push(codeList[code]);
        }
        else {
            for (const each in priceItems) {
                // todo: improve performance 
                // console.log(app, group, priceItems[each].props.app, priceItems[each].props.group);
                if (priceItems[each].props.app != app) continue;
                if (priceItems[each].props.app + '-' + priceItems[each].props.group != group) continue;
                // if (priceItems[each].code != code) continue;
                // console.log(this.childPriceItems[each]);
                baseItems.push(priceItems[each].props.code);
            }
        }

        if (action == 'REMOVE') {
            // console.log('baseItems', baseItems);
            const allSuccessorItems = Dependencies.getSuccessors(baseItems);

            // console.log(allDependentItems, action);

            for (const each in allSuccessorItems) {
                priceItems[allSuccessorItems[each]].doAction(action);
            }

        }
        else {
            //console.log('baseItems', baseItems);
            const allDependentItems = Dependencies.getAncestors(baseItems);

            // console.log(allDependentItems, action);

            for (const each in allDependentItems) {
                priceItems[allDependentItems[each]].doAction(action);
            }            
        }
    }
}

let actions = store => ({
    ...wrap_actions(cart_related_actions, update_cart_wrapper), 
    ...wrap_actions(pip_related_actions, update_pip_wrapper), 
    ...other_actions})

export {
    store,
    actions,
    registerItem
}