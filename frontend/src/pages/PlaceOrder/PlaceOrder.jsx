import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
const PlaceOrder = () => {
   const{getTotalCartAmount}=useContext(StoreContext)
  return (
    <>
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input type='text' Placeholder='First Name'></input>
          <input type='text' Placeholder='Last Name'></input>
        </div>
        <input type="text" placeholder='Email address' />
        <input type="text" placeholder='Street'  />
        <div className="multi-field">
          <input type='text' Placeholder='City'></input>
          <input type='text' Placeholder='State'></input>
        </div>
        <div className="multi-field">
          <input type='text' Placeholder='Zip code'></input>
          <input type='text' Placeholder='Country'></input>
        </div>
        <input type='text' placeholder='phone'/>

      </div>
      <div className="place-order-right">
        <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>${getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
                <b>Total:</b>
                <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              </div>
          
            </div>
            <button>PROCESS TO PAYMENT</button>
          </div>

      </div>
    </form>
    </>
  )
}

export default PlaceOrder