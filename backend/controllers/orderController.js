import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay"


//placing user order from frontend

const placeOrder = async (req,res)=>{
  try {

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
  console.log(order.id)
  const payment_id = order.id

   /////play ground /////


    const {orderData} = req.body
   const newOrder = new orderModel({
    userId:req.body.userId,
    pay_id:payment_id,
    items:orderData.item,
    amount:orderData.amount,
    address:orderData.address
   })
   await newOrder.save();
   await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
   
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

const userOrders = async (req,res)=>{
      try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
        
      } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
      }
}

const listOrders = async (req,res)=>{
     try {
      const orders = await orderModel.find({});
      res.json({success:true,data:orders})
     } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
     }
}

//api for order status

const updatestatus = async(req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

export {placeOrder,userOrders,listOrders,updatestatus}
