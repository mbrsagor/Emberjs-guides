import React from 'react';
import PriceDisplay from './PriceDisplay';

const CartItemPrimary = ({cartItem, showMandays, ...props}) => {
  return (
    <div className="row">
      <div className="col-8 cart-item" title={cartItem.code}>
        <h6>{ cartItem.name }</h6>
        {
          showMandays
          ? <span class="mandays">{cartItem.mandays} {cartItem.unit} x <PriceDisplay {...props} value={cartItem.unitPrice} /></span>
          : ''
        }
      </div>
      <PriceDisplay className="col-4 cart-price" value={ cartItem.price } valueText={cartItem.priceText} />
    </div>
  )
}

export default CartItemPrimary;