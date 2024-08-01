import express from "express"
import {generateOTP,verifyOTP,ResetPassword} from "../controllers/verifyController.js" 

const verifyrouter = express.Router();

verifyrouter.post("/",generateOTP)
verifyrouter.post("/verify",verifyOTP)
verifyrouter.post("/Resetpassword",ResetPassword)

export default verifyrouter;