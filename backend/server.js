import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRout.js'
import orderRouter from './routes/orderRoute.js'
import verifyrouter from './routes/verifyrouter.js'

//app config
const app = express()
const port = 4000;

//middleware
app.use(express.json())
app.use(cors())


//db connection
connectDB()

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/OTP",verifyrouter)


app.get("/",(req,res)=>{
    res.send("Api Connected")
})




app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})

//mongodb+srv://greatstack:1182528@cluster0.shzj9fi.mongodb.net/? retryWrites=true&w=majority&appName=Cluster0


app.get("/test/",(req,res)=>{
    res.send("Api is working")
})
