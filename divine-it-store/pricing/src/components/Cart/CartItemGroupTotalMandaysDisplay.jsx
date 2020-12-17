import React from 'react';

const CartItemGroupTotalMandaysDisplay = ({cartItems, className, variant}) => {
  return (
      <div className={className + ' cart-price'}>
      { cartItems.length ?
          cartItems.reduce((acc, item) => (acc + item.freeUnit) , 0).toFixed(1) :
          Number(0).toFixed(1)
      }
      </div>
  )
}

export default CartItemGroupTotalMandaysDisplay;