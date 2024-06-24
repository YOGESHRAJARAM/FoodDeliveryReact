import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator";



//login user

const loginUser =async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
           return res.json({success:false,message:"User Doesn't exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id)

        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})

        
    }
  
}

//create token

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register User

const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;
    try {
        //cheacking is user alrerady exist
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"useralready exists"})
        }

        //valitating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        
        if (password.length<8) {
            return res.json({success:false,message:"please enter strong password"})
            
        }

        //hasing user password

        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password,salt)

        //creating user

        const newUser = new userModel({
            name:name,
            email:email,
            password:hasedPassword

        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
    }

}

export {loginUser,registerUser}