import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


//placing user order from frontend

const placeOrder = async (req,res)=>{
  try {
   const newOrder = new orderModel({
    userId:res.body.userId,
    items:req.body.items,
    amount:req.body.amount,
    address:req.body.address
   })
   await newOrder.save();
   await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//    const line_items = req.body.items
//here we have to integrate payment
    
  } catch (error) {
    
  }
}

export {placeOrder}
