import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
const PlaceOrder = () => {
   const{getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
   const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
   })

   const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
   }
  //  useEffect(()=>{
  //     console.log(data)
  //  },[data])



  const placeOrder = async (event)=>{
       event.preventDefault();
       let orderItems = [];
       food_list.map((item)=>{
        if(cartItems[item._id]>0){
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo)
        }
       })
       console.log(orderItems);
      //  console.log(getTotalCartAmount()+2)
       let orderData ={
         address:data,
         item:orderItems,
         amount:getTotalCartAmount()+2,
       }
       let amount = getTotalCartAmount()*100;
       amount += 200
       const currency = "INR";
       const receiptId = "qwsap";
    
       let response = await fetch(url+"/api/order/place",{
        method:"POST",
        body:JSON.stringify({
           option:{
            amount,
            currency,
            receipt:receiptId
           },
           orderData,
         
        }),
        headers:{
          "content-Type":"application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const order = await response.json()
      console.log(order);
      var options = {
        "key": "rzp_test_RJom3ko4MEzDV4", // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response){
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            const body ={
              ...response
            };
          const validateres = await fetch(url+"/api/order/validate",{
            method:"POST",
            body:JSON.stringify(body),
            headers:{
              "Content-Type":"application/json",
            },
           });
           const jsonRes = await validateres.json();
           console.log(jsonRes);
        },
        "prefill": {
            "name": "Yogesh",
            "email": "YogeshRajaram@gmail.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  

  };

  return (
    <>
    <form onSubmit={placeOrder} className='place-order' >
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name'></input>
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name'></input>
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="text" placeholder='Email address' />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'  />
        <div className="multi-field">
          <input required name="city" onChange={onChangeHandler} value={data.city} type='text' placeholder='City'></input>
          <input required name="state" onChange={onChangeHandler} value={data.state} type='text' placeholder='State'></input>
        </div>
        <div className="multi-field">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code'></input>
          <input required name="country" onChange={onChangeHandler} value={data.country} type='text' placeholder='Country'></input>
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type='text' placeholder='phone'/>

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
            <button type='submit'>PROCESS TO PAYMENT</button>
          </div>

      </div>
    </form>
    </>
  )
}

export default PlaceOrder