import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'unistore/react'
import { store, actions } from './core/store'
import events from './core/events';


const map_actions = (actions, store) => {
	if (typeof actions==='function') actions = actions(store);
	let mapped = {};
	for (let i in actions) {
		mapped[i] = store.action(actions[i]);
	}
	return mapped;
}


export default class Pricing {

    constructor(elem, initState, addToCartListener, changeListener, loginRequiredCallback, emailVerificationRequiredCallback) {
        this.store = store;
        this.addToCartCallback = addToCartListener;
        this.onChangeCallback = changeListener;
        this.loginRequiredCallback = loginRequiredCallback;
        this.emailVerificationRequiredCallback = emailVerificationRequiredCallback;

        this.setUpListeners();

        this.actions = map_actions(actions, store);

        this.actions.initialize(initState);

        ReactDOM.render((
            <Provider store={this.store}>
                <App />
            </Provider>
        ), elem);

    }

    setUpListeners() {
        document.addEventListener(events.ADD_TO_CART_EVENT, (e) => {
            if (typeof this.addToCartCallback === 'function') {
                let state = this.store.getState()
                this.addToCartCallback({
                    cart: state.cart,
                    cartItems: state.cartItems,
                    params: state.params,
                    global: state.global,
                    version: state.version
                })
            }
        })


        document.addEventListener(events.LOGIN_REQUIRED, (e) => {
            if (typeof this.loginRequiredCallback === 'function') {
                this.loginRequiredCallback()
            }
        })

        document.addEventListener(events.EMAIL_VERIFICATION_REQUIRED, (e) => {
            if (typeof this.emailVerificationRequiredCallback === 'function') {
                this.emailVerificationRequiredCallback()
            }
        })

        this.store.subscribe((state) => {
            if (typeof this.onChangeCallback === 'function') {
                this.onChangeCallback({
                    cart: state.cart,
                    cartItems: state.cartItems,
                    params: state.params,
                    global: state.global,
                    version: state.version,
                    pip: state.pip
                })
            }
        })
    }
}
