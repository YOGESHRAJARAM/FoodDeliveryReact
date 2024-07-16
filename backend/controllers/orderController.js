import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay"


//placing user order from frontend

const placeOrder = async (req,res)=>{
  try {
    const {orderData} = req.body
   const newOrder = new orderModel({
    userId:req.body.userId,
    items:orderData.item,
    amount:orderData.amount,
    address:orderData.address
   })
   await newOrder.save();
   await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

   ////play ground /////
   var razorpay = new Razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET,
  });
  const options = req.body.option;
  const order = await razorpay.orders.create(options)

  if(!order){
    return res.json("error")
  }

  res.json(order)

   /////play ground /////


    
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export {placeOrder}
