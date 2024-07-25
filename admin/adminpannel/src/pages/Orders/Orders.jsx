import React, { useState,useEffect,useRef } from 'react'
import './Orders.css'
import {toast} from "react-toastify"
import axios from "axios"
import {assets} from '../../assets/assets'


const Orders = ({ url }) => {
  const [previousId, setPreviousId] = useState([]);
  const [orders, setOrders] = useState([]);

 
  const ringer = async() =>{

    const audio =new Audio(assets.bell)
    audio.play()
  
  }
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
          setOrders(response.data.data);
  
      } else {
        console.error("Error fetching orders:", response.data); // Log error
        // Handle error (e.g., display error message)
      }
    } catch (error) {
      console.error("Error fetching orders:", error); // Log unexpected error
      // Handle error (e.g., display generic error message)
    }
  };
  // console.log(orders); 
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        fetchAllOrders();
      } else {
        console.error("Error updating order status:", response.data); // Log error
        // Handle error (e.g., display error message)
      }
    } catch (error) {
      console.error("Error updating order status:", error); // Log unexpected error
      // Handle error (e.g., display generic error message)
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchAllOrders, 2000); // Fetch orders every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!orders.length || !previousId){
   
      return   
    }; // Skip if no orders or no previous ID

    const latestOrderId = orders[orders.length - 1]._id;
    const latestOrderStatus = orders[orders.length -1].status;
    // console.log("Latest Order ID:", latestOrderId); // Log latest order ID
    // console.log("Previous ID:", previousId); // Log previous ID
    // console.log(latestOrderStatus)
   

    if (latestOrderId !== previousId) {
      setPreviousId(latestOrderId);
      if(latestOrderStatus == "Food Processing"){
        // buttonRef.current.click()
        toast.success(`New Order Received (ID: ${latestOrderId})`);
        ringer()
      }
     
    }
    
  
  }, [orders, previousId]);

  let reversorder = orders.slice().reverse()
  return (

    <div className="order add">
     
      <h3>Order Page</h3>
      <div className="order-list">
        {reversorder.map((order,index)=>(
          <div key={index} style={order.status==="Delivered" ?{backgroundColor:'#CCCCCC'} : order.status==="packed ready for shiping"?{backgroundColor:"#F6FB7A"}:order.status==="Food Processing"?{backgroundColor:"#88D66C"}:order.status==="Out for delivery"?{backgroundColor: "#B4E380"}:{backgroundColor:"white"}} className="order-item">
             <img src={assets.parcel_icon} alt=''/>
             <p>{order._id}</p>
             <div>
             
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                    if(index === order.items.length-1){
                        return item.name + " x " + item.quantity
                    }
                    else{
                      return item.name + " x " + item.quantity + " , "
                    }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName+ " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + " , "}</p>
                <p>{order.address.city+ " , "+ order.address.state + " , "+ order.address.country + " , " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
              <p>Payment: {order.payment ?<span  style={{fontWeight:'bolder',color:'green'}}> Payed</span> : <span style={{fontWeight:'bolder',color:'red'}}> Not Payed</span>}</p>
             </div>
             <p>Items : {order.items.length}</p>
             {/* <button ref={buttonRef} onClick={()=>{ringer()}}>play</button> */}
            
             <p style={{fontWeight:'bolder'}}>Rs.{order.amount}</p>
             <select onChange={(event) => statusHandler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="packed ready for shiping">packed ready for shiping</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
             </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders