import React from 'react';
import PriceDisplay from './PriceDisplay';

const CartItemDebug = ({cartItem}) => {
  return (
    <div className="row">
      <div className="col-8 cart-item" title={cartItem.code}>{ cartItem.name }
        f: {cartItem.freeUnit} d: {cartItem.discountUnit} p: {cartItem.paidUnit}
        fp: {cartItem.freeprice} pp: {cartItem.price}
      </div>
      <PriceDisplay className="col-4 cart-price" value={ cartItem.price } />
    </div>
  )
}

export default CartItemDebug;