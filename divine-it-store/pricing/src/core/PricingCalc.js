import ItemConfig, {SOFTWARE} from "./ItemConfig";
import {UserPricing} from "./UserConfig";

const prepare_item = (segment, name, app, price, priceText) => {
    const item = {
        type: segment,
        code: segment,
        name: name,
        app: app,
        price: price,
        priceText: priceText
    };

    return item;
}

const update_aggregate_item = (item, config, itemList) => {
    if (config.unit) {
        item.mandays = 0;
        item.unit = config.unit;
        item.unitPrice = config.unitPrice;
        for (let each in itemList) {
            //console.log('==', itemList[each].mandays);
            item.mandays += itemList[each].mandays || 0;
        }
    }
}

const update_item = (item, config, pip, force, paramConfig) => {

    if (config.unit && (config.aggregate || force)) {

        // calculate per app mandays
        let value = Math.round(item.price / (config.unitPrice * config.rounding));
        let fractionalValue = Math.floor(value * config.rounding * 100) / 100;

        let mandays;

        if (config.minUnit) mandays = Math.max(fractionalValue, config.minUnit);
        else mandays = fractionalValue;

        const diffValue = Math.max(Math.floor(fractionalValue / 2), 1);
        const stdValue  = fractionalValue;
        const minValue  = Math.max(stdValue - diffValue, 0);
        const maxValue  = Math.max(stdValue + diffValue, 50);

        if (undefined !== config.pip) {
    
            let pipConfigName = '';

            pipConfigName = config.pip + (item.app ? '.'+item.app : '');
            const userValue = pip[pipConfigName];

            // console.log('updating item', pipConfigName, userValue, stdValue);

            if (undefined !== userValue) {
                mandays = Math.max(minValue, userValue);
                mandays = Math.min(maxValue, mandays);
            }

            paramConfig[pipConfigName] = {
                minValue: minValue,
                stdValue: stdValue,
                maxValue: maxValue
            };
        }

        item.mandays = mandays;

        item.price = Math.round(item.mandays * config.unitPrice);

        item.unitPrice = config.unitPrice;
        item.unit = config.unit;

        // todo: update pipConfig here


        //console.log('--', config.name, item.price, item.mandays, pipConfigName);
    }
}

const calculate_software = (segment, config, software, options, ProductList, params, pip, paramConfig) => {
    let items = {};
    let total = 0.0;
    for (let each in software) {
        const module = software[each];
        if (undefined === items[module.app]) {
            const name = ProductList[ProductList.findIndex((item) => item.code === module.app)].name;
            items[module.app] = prepare_item(
                segment,
                name,
                module.app,
                module.price
            );
        }
        else {
            items[module.app].price += module.price;
        }

        total += module.price;
        // console.log('items', segment, module, module.price, total);
    }

    total = Math.round(total);

    return {
        price: total,
        suggestedTotal: total,
        items: Object.values(items),
        subitems: software
    };
}

const calculate_segment = (segment, config, cartSoftware, options, params, pip, paramConfig) => {
    let items = {};
    let total = 0.0;
    let finalTotal = 0.0

    // console.log(segment, 'config', config, 'cartsoftware', cartSoftware, 'params', params, 'pip', pip, 'paramConfig', paramConfig);


    for (let each in cartSoftware) {
        const softitem = cartSoftware[each];

        let weight = ((softitem.weight && softitem.weight[segment]) ? softitem.weight[segment] : config.weight);
        const segmentSuggestedPrice = Math.ceil(softitem.price * weight);

        const name = config.name + (softitem.app === undefined ? '' : ' (' + softitem.app + ')');

        //console.log('calculate', segment, softitem, segmentSuggestedPrice);
        items[softitem.app] = prepare_item(
            segment,
            name,
            softitem.app,
            segmentSuggestedPrice
        );

        total += segmentSuggestedPrice;
        // console.log('items', segment, module, items);
        update_item(items[softitem.app], config, pip, undefined, paramConfig);
        finalTotal += items[softitem.app].price;
    }

    const primaryItem = prepare_item(segment, config.name, undefined, finalTotal);

    if (true === config.aggregate) {
        update_aggregate_item(primaryItem, config, items);
    }
    else {
        update_item(primaryItem, config, pip, true, paramConfig);
    }

    //console.log(primaryItem, items);

    return {
        price: primaryItem.price,
        suggestedTotal: finalTotal,
        items: [primaryItem],
        subitems: Object.values(items)
    };

}


const calculate_segment_old = (segment, config, software, options, ProductList, params, pip, paramConfig) => {
    let items = {};
    let total = 0;
    for (let each in software) {
        const module = software[each];
        let weight = ((module.weight && module.weight[segment]) ? module.weight[segment] : config.weight);
        const segmentSuggestedPrice = Math.ceil(module.price * weight);

        if (undefined === items[module.app]) {
            let name;
            if (options && undefined !== options['useAppName']) {
                // console.log('useProductName option');
                name = ProductList[ProductList.findIndex((item) => item.code === module.app)].name;
            }
            else {
                // console.log('not useProductName option', options);
                name = config.name + (module.app === undefined ? '' : ' (' + module.app + ')')
            }

            items[module.app] = prepare_item(
                segment,
                name,
                module.app,
                segmentSuggestedPrice
            );
        }
        else {
            items[module.app].price += segmentSuggestedPrice;
        }

        total += segmentSuggestedPrice;
        // console.log('items', segment, module, items);
    }

    if (options.keepBreakdown) {
        return {
            price: total,
            suggestedTotal: total,
            items: Object.values(items),
            subitems: software
        };
    }
    else {
        let finalTotal = 0;
        for (let each in items) {
            update_item(items[each], config, pip, undefined, paramConfig);
            finalTotal += items[each].price;
        }

        const primaryItem = prepare_item(segment, config.name, undefined, finalTotal);

        if (true === config.aggregate) {
            update_aggregate_item(primaryItem, config, items);
        }
        else {
            update_item(primaryItem, config, pip, true, paramConfig);
        }

        //console.log(primaryItem, items);

        return {
            price: primaryItem.price,
            suggestedTotal: finalTotal,
            items: [primaryItem],
            subitems: Object.values(items)
        };
    }

    // const index = newCartItems.findIndex((item) => item.type==each && item.app == priceItem.app);
    // const unitPrice = 10000;

    //   if (index != -1) {
    //     newCartItems[index]['freeprice'] += freePriceValue;
    //     newCartItems[index]['price'] += freePriceValue;
    //     let unit10 = Math.floor(10 * newCartItems[index]['freeprice'] / unitPrice);
    //     let unitmod = unit10 % 10;
    //     unit10 -= unitmod;

    //     // if (unitmod < 5) unitmod = 0;
    //     // else unitmod = 5;

    //     newCartItems[index]['freeUnit'] = (unit10 + unitmod) / 10.0
    //     console.log('updating', price);
    //   }
    //   else {
    //     newCartItems.push({
    //       type: each,
    //       code: priceItem.app,
    //       name: priceItem.app,
    //       app: priceItem.app,
    //       parameter1: null,
    //       discountUnit: 0,
    //       paidUnit: 0,
    //       freeUnit: Math.floor(freePriceValue / unitPrice),
    //       unitPrice: unitPrice,
    //       freeprice: freePriceValue,
    //       price: freePriceValue
    //     });
    //     console.log('inserting', price);
    //   }
    // }

}

const calculate_free_users = (price, slabs, slabqty) => {

    let freeUsers   = 0;
    let remaining   = price;
    let i = 0;

    let slabRemaining = 0;

    for (; i<slabs.length; i++) {
        const value = Math.min(slabs[i], remaining);
        freeUsers += Math.ceil((value / slabs[i]) * slabqty[i]);      
        remaining -= value;
        slabRemaining = slabs[i] - value;
        if (remaining == 0) break;
    }

    if (remaining) {
        freeUsers += Math.ceil((remaining * 10 ) / slabs[slabs.length-1]);
    }

    return freeUsers;
}

const calculate_paid_users = (price, paidUsers, TotalUser, TotalUserPerSlab, PriceSlab, Additional) => {

    const paidUserInSlab = Math.min(paidUsers, TotalUser);
    const paidUserOutsideSlab = paidUsers - paidUserInSlab;

    let totalPrice = 0;
    let index = 0;

    for (const p in PriceSlab) {
        if (p > price ) break;
        index = p;
    }

    // console.log('index', index);

    let remaining = paidUserInSlab;

    for (const each in TotalUserPerSlab) {
        const current = Math.min(TotalUserPerSlab[each], remaining);
        //console.log(index, current, PriceSlab[index][each], current * PriceSlab[index][each], remaining);
        totalPrice += current * PriceSlab[index][each];
        remaining -= current;
        if (!remaining) break;
    }

    if (paidUserOutsideSlab) totalPrice += paidUserOutsideSlab * Additional;

    return totalPrice;
}


const  calculate_user = (segment, config, software, params) => {

    const totalUsers = params['params.users'] || 0;

    const freeUsers = calculate_free_users(software.price || 0, UserPricing.FreeUser.slabs, UserPricing.FreeUser.slabqty);

    const paidUsers = Math.max(totalUsers, freeUsers) - freeUsers;

    const total = calculate_paid_users(software.price || 0, paidUsers, UserPricing.PaidUser.TotalUserInSlab, UserPricing.PaidUser.TotalUserPerSlab, UserPricing.PaidUser.PriceSlab, UserPricing.PaidUser.Additional);

    //console.log('--- ', freeUsers, i);

    // slabRemaining to be added to user value;

    //console.log('---', remaining, slabs[slabs.length-1], Math.ceil((remaining * 10 ) / slabs[slabs.length-1]), freeUsers);


    const freeUsersItem = prepare_item(segment + 'FREE', freeUsers.toString() + ' Users Inclucded', undefined, 0, '[INCLUDED]');
    const items = [freeUsersItem];

    if (paidUsers > 0) {
        const paidUsersItem = prepare_item(segment, paidUsers + ' ' + config.name + (total / paidUsers).toFixed(0), undefined, total);
        items.push(paidUsersItem)
    }

    return {
        price: total,
        suggestedTotal: total,
        items: items,
        subitems: []
    };
}

const calculate_amc = (segment, config, cart, params) => {
    const total_amc_applicable = cart.sections.SOFTWARE.price 
        + cart.sections.USER.price 
        + cart.sections.SOFTWARE_CUSTOM.price 
        + cart.sections.SOFTWARE_REPORT.price;

    const amc = Math.ceil(total_amc_applicable * (params.amc_rate || 0.2));

    const freeUsersItem = prepare_item(segment, config.name, undefined, amc);

    // console.log('amc calculation', cart.sections.USER, total_amc_applicable, amc);

    return {
      price: amc,
      suggestedTotal: amc,
      items: [freeUsersItem],
      subitems: []
    };
}

const calculate_price_software = (cart, cartItems, ProductList, params, pip, paramConfig) => {
    cart.sections['SOFTWARE'] = calculate_software(
        'SOFTWARE',
        ItemConfig.SEGMENTS[ItemConfig.SEGMENTS.SOFTWARE],
        cartItems,
        {},
        ProductList,
        params,
        pip, 
        paramConfig
    );
}

const calculate_phase = (phase, cart, cartItems, ProductList, params, pip, paramConfig, options) => {
    // console.log('phase', phase, cartItems);
    // console.log('params', params);
    // console.log('pip', pip);
    // console.log('paramConfig', paramConfig);
    //console.log(options);

    if (options && options.segment) {
        cart.sections[options.segment] = calculate_segment(
            options.segment,
            ItemConfig.SEGMENTS[options.segment],
            cartItems,
            {},
            params,
            pip, 
            paramConfig
        )
        cart.totalPrice += cart.sections[options.segment].price;
        return;
    }

    for (let segment in ItemConfig.SEGMENTS) {
        if (ItemConfig.SEGMENTS[segment].phase !== phase) continue;    

        cart.sections[segment] = calculate_segment(
            segment,
            ItemConfig.SEGMENTS[segment],
            cartItems,
            {},
            params,
            pip, 
            paramConfig
        )
        cart.totalPrice += cart.sections[segment].price;
    }
}

const calculate_price_custom = (...args) => {
    calculate_phase('custom', ...args);
}

const calculate_price_pip = (...args) => {
    calculate_phase('pip', ...args);
}

const calculate_price_user = (cart, software_items, ProductList, params, pip, paramConfig) => {
    cart.sections.USER = calculate_user('USER', ItemConfig.SEGMENTS.USER, cart.sections.SOFTWARE, params);
}

const calculate_price_maintenance = (cart, params, pip, paramConfig) => {
    cart.sections.AMC = calculate_amc('AMC', ItemConfig.SEGMENTS.AMC, cart, params);
}

const calculate_total = (cart) => {
    cart.totalPrice = 0.0;
    for (let segment in ItemConfig.SEGMENTS) {
        if (undefined === cart.sections[segment]) {
            cart.sections[segment] = {
                price: 0.0,
                items: []
            };
        }
        cart.totalPrice += cart.sections[segment].price;
    }
    return cart;    
}

const calculate_price_params_change = (cart, cartItems, ProductList, params, pip, paramConfig) => {
    // update price ?    
}

const calculate_price_pip_change = (cart, cartItems, ProductList, params, pip, paramConfig, options) => {
    if (undefined === options) {
        calculate_price_pip(cart, cartItems, ProductList, params, pip, paramConfig);
        calculate_price_custom(cart, cartItems, ProductList, params, pip, paramConfig);
        calculate_price_maintenance(cart, cartItems, ProductList, params, pip, paramConfig);
    }
    else {
        if (options.phase == 'custom') {
            calculate_price_custom(cart, cartItems, ProductList, params, pip, paramConfig, options);    
        }
        else if (options.phase == 'maintenance') {
            calculate_price_maintenance(cart, cartItems, ProductList, params, pip, paramConfig, options);
        }
        else if (options.phase == 'pip') {
            calculate_price_pip(cart, cartItems, ProductList, params, pip, paramConfig, options);
        }
        
    }
    calculate_total(cart);

    return {
        cart: cart
    };
}

// price item change
const calculate_price = (cartOld, cartItems, ProductList, params, pip, paramConfig) => {
    const cart = {
        sections: {},
        totalPrice: 0.0
    };

    calculate_price_software(cart, cartItems, ProductList, params, pip, paramConfig);
    calculate_price_custom(cart, cart.sections.SOFTWARE.items, ProductList, params, pip, paramConfig);
    calculate_price_user(cart, cart.sections.SOFTWARE.items, ProductList, params, pip, paramConfig);
    calculate_price_pip(cart, cart.sections.SOFTWARE.items, ProductList, params, pip, paramConfig);
    calculate_price_maintenance(cart, cart.sections.SOFTWARE.items, ProductList, params, pip, paramConfig);
    calculate_total(cart);

    return {
        cart: cart,
        paramConfig: paramConfig
    };
}

export default calculate_price;
export {calculate_price_pip_change}