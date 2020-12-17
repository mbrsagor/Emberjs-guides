import React from 'react';
import Button from 'react-bootstrap/Button';
import {connect} from "unistore/react";
import PriceDisplay from "../Cart/PriceDisplay";
import { store, actions, registerItem } from '../../core/store';

const EVERYTHING = 'EVERYTHING';
const ADD = 'ADD';
const REMOVE = 'REMOVE';
const TOGGLE = undefined;

class PriceItem extends React.Component {

    constructor(props) {
        super(props);

        const {multiplier} = {...props.data.price};
        
        //state.cartItems.contains()

        let isAdded = false;
        const state = store.getState();
        for (let each in state.cartItems) {
            if (state.cartItems[each].code == this.props.code) {
                isAdded = true;
                break;
            }
        }

        this.state = {
            multiplier__name: multiplier,
            added: isAdded
        };
        // console.log(this);
        this.onAddOrRemove = this.onAddOrRemove.bind(this)
    }

    componentDidMount() {
        registerItem(this);
    }

    priceStartsAt(value) {
        return (<div className="price-text"><a href="#">{value}</a></div>)
    }

    getMultiplierName = () => {
        const {multiplier__name} = {...this.state};
        return multiplier__name;
    }

    getMultiplierValue = (base_multiplier__name, multiplier__name) => {

        if (this.props.params && this.props.params[multiplier__name])
            return this.props.params[multiplier__name];

        if (this.props.params && this.props.params[base_multiplier__name])
            return this.props.params[base_multiplier__name];

        return undefined;
    }

    getMultiplierSlabs = (multiplier__name) => {
        const {multipliers} = {...this.props};

        if (undefined === this.props.multipliers) {
            console.log('error no multiplier', multiplier__name, this.props);
            return [];
        }
        const filteredMultipliers = this.props.multipliers.filter((each) => each.name == multiplier__name);
        let slabs = undefined;

        if (filteredMultipliers.length == 1) {
            slabs = filteredMultipliers[0].slabs;
        }
        return slabs;
    }

    calculatePrice = () => {

        const multiplier = this.getMultiplierName();

        if (!multiplier) return this.props.data.price.slab1;

        // console.log('found multiplier', multiplier, this.props.code);

        // console.log(multiplier, multipliers, this.props.params)
        else {

            if (!(this.props.multipliers && this.props.params)) {
                console.log('error -', multiplier, this.props);
                // throw "this.props.params and multipliers are missing for " + this.props.code;
            }

            const base_multiplier__name = 'params.' + multiplier;
            const multiplier__name = base_multiplier__name + '.' + this.props.group;

            let multiplier__value = this.getMultiplierValue(base_multiplier__name, multiplier__name);

            // if (this.state.multiplier__value == multiplier__value) return this.state.totalPrice;

            let totalPrice = 0;
            totalPrice = this.props.data.price.slab1;

            const slabs = this.getMultiplierSlabs(multiplier__name);

            // console.log('multiplier', this.props.code, multiplier__name, multiplier__value, slabs, this.props.data.price);

            if (slabs) {
                // props.data.price && props.data.price.slab1 ? this.props.data.price.slab1 : 0.0,

                if (multiplier__value > slabs[0]) totalPrice += (((multiplier__value < slabs[1]) ? multiplier__value : slabs[1]) - slabs[0]) * (this.props.data.price.slab2 - this.props.data.price.slab1) / (slabs[1] - slabs[0]);
                if (multiplier__value > slabs[1]) totalPrice += (multiplier__value - slabs[1]) * (this.props.data.price.slab3 - this.props.data.price.slab2) / (slabs[2] - slabs[1]);
            }

            totalPrice = Math.ceil(totalPrice);
            // this.setState({multiplier__value: multiplier__value, totalPrice: totalPrice});

            return totalPrice;
        }
    }

    priceValue() {
        const totalPrice = this.calculatePrice();

        return (
            <PriceDisplay className='module-price' value={totalPrice}/>
        )
    }

    addOrRemoveButton() {
        return (<Button variant={this.state.added ? 'success' : 'primary'}
                        onClick={this.onAddOrRemove}>{this.state.added ? 'Remove' : 'Add'}</Button>)
    }

    doAction = (action) => {

        if (!this.props.data.price) return;
        if (!this.props.data.price.slab1) return;
        if (isNaN(this.props.data.price.slab1) || this.props.data.price.slab1 == 0) return;

        if (this.state.added) {
            this.props.removeFromCart(this.props)
        }
        
        let state = false;

        //console.log(this.props.code, this.props.data.excludeInAll, (ADD === action && (!this.props.data.excludeInAll || this.props.data.excludeInAll != true)));
        
        if (
          EVERYTHING === action
          || (ADD === action && (!this.props.data.excludeInAll || this.props.data.excludeInAll != true))
          || (TOGGLE===action && !this.state.added)) {
            this.props.addToCart(this.props, this.calculatePrice());
            state = true;
        }

        // if (this.state.added) {
        //     this.props.removeFromCart(this.props)
        // }
        // else {
        //     // console.log('--', '---', this.props.code, this.props.name, this.calculatePrice());
        //     this.props.addToCart(this.props, this.calculatePrice());
        // }

        this.setState({
            added: state
        });
    }

    onAddOrRemove(event) {
        const action = this.state.added ? 'REMOVE' : 'ADD';
        if (this.props.module) {
            if (this.state.added) {
                this.props.addItems(action, {'codeList': [this.props.code]});
            }
            else {
                this.props.addItems(action, {'codeList': [this.props.code, this.props.module]});
            }
        }
        else {
            if (this.state.added) {
                const codeList = [this.props.code];
                for (const each in this.props.data.features) {
                    codeList.push(this.props.data.features[each].code);
                }
                for (const sm in this.props.data.submodules) {
                    for (const each in this.props.data.submodules[sm].features) {
                        codeList.push(this.props.data.submodules[sm].features[each].code);
                    }
                }
                this.props.addItems(action, {'codeList': codeList});
            }
            else {
                this.props.addItems(action, {'codeList': [this.props.code]});
            }
        }
        event.preventDefault();
    }

    render() {

        let priceStartAt;
        let priceValue;
        let addButton = '';

        if (this.props.data.price) {
            priceStartAt = this.priceStartsAt('Learn More')
            priceValue = this.priceValue()
            addButton = this.addOrRemoveButton()
        }
        else {
            priceStartAt = this.priceStartsAt(' ')
            priceValue = (<div className="price"></div>)
        }

        return (
            <div className={this.props.className} title={this.props.code}>
                <div className="price-container">
                {priceValue}
                {priceStartAt}
                </div>
                <div className="status-container">
                    {addButton}
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default connect(['params', 'paramConfig'], actions)(PriceItem);