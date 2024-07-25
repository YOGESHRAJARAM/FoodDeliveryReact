import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder,userOrders,listOrders,updatestatus } from "../controllers/orderController.js"
import crypto from "node:crypto"
import orderModel from "../models/orderModel.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.get('/list',listOrders)
orderRouter.post("/status",updatestatus)

orderRouter.post("/validate",async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
    const sha = crypto.createHmac("sha256",process.env.KEY_SECRET) 
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if(digest !== razorpay_signature) {
       return res.status(400).json({msg:"Transaction is not legit"})
       
    }
    
    res.json({
       msg:"success",
       orderId:razorpay_order_id,
       paymentId:razorpay_payment_id,
    })
    await orderModel.findOneAndUpdate({pay_id:razorpay_order_id},{payment: true});
   //  await orderModel.deleteMany({payment: false});
 
  })

  orderRouter.post("/userorders",authMiddleware,userOrders)

export default orderRouter