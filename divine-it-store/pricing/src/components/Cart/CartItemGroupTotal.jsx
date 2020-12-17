import React from 'react';
import CartItemGroupTotalPriceDisplay from './CartItemGroupTotalPriceDisplay';

const CartItemGroupTotal = ({cartItems}) => {
  return (
    <div className="row">
      <div className="col-8 cart-item">Total : </div>
      <CartItemGroupTotalPriceDisplay className="col-4" cartItems={cartItems} />
    </div>
  )
}

export default CartItemGroupTotal;