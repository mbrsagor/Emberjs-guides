import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PriceDisplay from './PriceDisplay';
import FullScreenBtn from '../../core/FullScreenBtn';
import CartItemGroup from './CartItemGroup';
import {actions} from "../../core/store";
import {connect} from "unistore/react";
import events from '../../core/events';


class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showMandays: false,
            software: false,
            pip: false,
            customization: false,
            consultancy: false,
            amc: false
        }
    }

    handleShowDetailsChange = () => {
        this.setState((prevState) => ({
            showMandays: !prevState.showMandays
        }));
    }

    updateVisibilityState = (section, e) => {
      //this.setState([section]: {state});
      e.preventDefault();
      //{this.setState(prevState=>{{software: !prevState.software}})}
    }

    clearCartItems = () => {
      this.props.clearCart();
    }

    addToCart = () => {
        events.authGaurd(this.props.user, events.dispatchAddToCart)
    }

    render() {
        const {cart, params, cartConfig} = this.props;

        return (
              <div className="cart sticky-top">
                <div className="d-flex flex-row justify-content-center align-content-center">
                    <h4 className="flex-grow-1">Summary</h4>
                    <div>
                        <FullScreenBtn />
                        <a href="#" onClick={this.clearCartItems}>X</a>
                    </div>
                </div>

                <div>
                <Form.Check 
                  type="switch"
                  label="Show Item Details"
                  id="details-display"
                  onChange={this.handleShowDetailsChange} />

                <div className={this.state.software ? 'software' : 'hide-content'}>
                  <h5>
                    <span>Software License</span>
                    <PriceDisplay className="float-right" 
                      value={
                        cart.sections.SOFTWARE.price
                        + (cartConfig.sections.SOFTWARE.includeUser ? cart.sections.USER.price : 0)
                      } 
                    />
                  </h5>
                  <CartItemGroup 
                    cartItems={cart.sections.SOFTWARE.items} 
                    showTotals={false} 
                  />
                  { cartConfig.sections.SOFTWARE.includeUser ? 
                    <CartItemGroup 
                      cartItems={cart.sections.USER.items} 
                      showTotals={false} 
                    />
                    : ''
                  }

                </div>

                {
                  cartConfig.sections.USER.hide ? '' : 
                  <div className="software">
                    <h5>
                      <span>User License</span>
                      <PriceDisplay className="float-right" value={cart.sections.USER.price } />
                    </h5>
                    <CartItemGroup 
                      cartItems={cart.sections.USER.items} 
                      showTotals={false} 
                      />
                  </div>                  
                }

                <div className="implementation">
                  <h5><span>Implementation</span>
                    <PriceDisplay className="float-right" value={
                      cart.sections.REQUIREMENT.price
                      + cart.sections.DEPLOYMENT.price
                      + cart.sections.CONFIGURATION.price
                      + cart.sections.ONSITE_SUPPORT.price
                      + cart.sections.TRAINING.price
                      + cart.sections.PROJECT.price
                    } />
                  </h5>

                  <CartItemGroup cartItems={cart.sections.REQUIREMENT.items} showTotals={false} showMandays={this.state.showMandays} />
                  <CartItemGroup cartItems={cart.sections.DEPLOYMENT.items} showTotals={false} showMandays={this.state.showMandays} />
                  <CartItemGroup cartItems={cart.sections.CONFIGURATION.items} showTotals={false} showMandays={this.state.showMandays} />
                  <CartItemGroup cartItems={cart.sections.ONSITE_SUPPORT.items} showTotals={false} showMandays={this.state.showMandays} />
                  <CartItemGroup cartItems={cart.sections.TRAINING.items} showTotals={false} showMandays={this.state.showMandays} />
                  <CartItemGroup cartItems={cart.sections.PROJECT.items} showTotals={false} showMandays={this.state.showMandays} />
                </div>


                <div className="software_custom">
                  <h5><span>Software Customization</span>
                    <PriceDisplay className="float-right" value={
                      cart.sections.SOFTWARE_CUSTOM.price
                      + cart.sections.SOFTWARE_REPORT.price
                    } />            

                  </h5>
                  <CartItemGroup cartItems={cart.sections.SOFTWARE_CUSTOM.items} showTotals={false} showMandays={this.state.showMandays} />
                  <CartItemGroup cartItems={cart.sections.SOFTWARE_REPORT.items} showTotals={false} showMandays={this.state.showMandays} />
                </div>

                <div className="consultant">
                  <h5>
                    <span>Consultancy Services</span>
                    <PriceDisplay className="float-right" value={cart.sections.CONSULTANT.price} />
                  </h5>

                  <CartItemGroup cartItems={cart.sections.CONSULTANT.items} showTotals={false} showMandays={this.state.showMandays} />
                </div>

                <div className="total">
                  <h5><span>Total</span>
                    <PriceDisplay className="float-right" value={cart.totalPrice} />
                  </h5>
                </div>

                <div className="amc">
                  <h5><span>Annual Maintenance Cost</span>
                    <PriceDisplay className="float-right" value={
                      cart.sections.AMC.price
                    } />
                  </h5>

                  <CartItemGroup cartItems={cart.sections.AMC.items} showTotals={false} />
                </div>


                <div className="d-none">PIP Debug Values</div>

                  {
                    Object.entries(this.props.pip).map(([pip, value]) =>
                      <div key={pip}>{ pip } : {JSON.stringify(value)}</div>
                    )
                  }

                </div>
                <Button variant='info' block onClick={this.addToCart}>Add To Cart</Button>
              </div>
        );
    }
}

export default connect(['pip', 'params', 'cart', 'cartConfig', 'user'], actions)(Cart);
