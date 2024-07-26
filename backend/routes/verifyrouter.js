import express from "express"
import {generateOTP,verifyOTP} from "../controllers/verifyController.js" 

const verifyrouter = express.Router();

verifyrouter.post("/",generateOTP)
verifyrouter.post("/verify",verifyOTP)

export default verifyrouter;