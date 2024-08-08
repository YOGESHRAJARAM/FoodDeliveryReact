import express from "express"
import {generateOTP,verifyOTP,ResetPassword,verifyExpire} from "../controllers/verifyController.js" 

const verifyrouter = express.Router();

verifyrouter.post("/",generateOTP)
verifyrouter.post("/verify",verifyOTP)
verifyrouter.post("/Resetpassword",ResetPassword)
verifyrouter.post("/verifyExpire",verifyExpire)

export default verifyrouter;