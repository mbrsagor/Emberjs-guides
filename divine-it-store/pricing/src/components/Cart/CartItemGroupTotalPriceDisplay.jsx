import React from 'react';
import PriceDisplay from './PriceDisplay';

const CartItemGroupTotalPriceDisplay = ({cartItems, className, useFreeprice}) => {
  return (
    <PriceDisplay className={className + ' cart-price'} value={
      cartItems.length ?
        cartItems.reduce((acc, item) => (acc + item.price + (useFreeprice ? item.freeprice : 0)) , 0).toFixed(0) :
        Number(0).toFixed(0)
    } />
  )
}

export default CartItemGroupTotalPriceDisplay;