import React from 'react';
import CartItemPrimary from './CartItemPrimary';
import CartItemDebug from './CartItemDebug';
import CartItemGroupTotal from './CartItemGroupTotal';


const CartItemGroup = ({cartItems, showTotals, variant, showMandays}) => {
  return (
    <div className="items">
        {
          cartItems.map(cartItem =>
            (variant !== 'debug'
              ? <CartItemPrimary key={cartItem.type + cartItem.code} cartItem={cartItem} showMandays={showMandays}/>
              : <CartItemDebug key={cartItem.type + cartItem.code} cartItem={cartItem} />
            )
          )
        }
        {
          showTotals
            ? <CartItemGroupTotal cartItems={cartItems} />
            : ''
        }
    </div>
  )
}

export default CartItemGroup;