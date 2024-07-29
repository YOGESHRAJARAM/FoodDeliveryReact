import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"




const generateOTP =async(req,res)=>{
    try {
        const {email} = req.body
        if(!email){
          console.log("nomail")
          return
        }
    console.log(email)
    const OneTimePassword = Math.random().toString(36).slice(-6)
    console.log(OneTimePassword)
    const generateJWT =()=>{
        const secret = process.env.OTP_KEY
        const payload = {
          
            OTP: OneTimePassword
          };
        const token = jwt.sign(payload,secret, { expiresIn: '10m' });
       
        console.log(token)
        return token
    }
    
     const Token = generateJWT()
 
    const transpoter = nodemailer.createTransport({
        service:"gmail",
        auth:{
          user:"bablusoftware12@gmail.com",
          pass:"yobg nmjt xrpw bdzd"
        }
      })
      const message = {
        from: 'bablusoftware12@gmail.com',
        to:email,
        subject:"Your OTP for Foodi Site Registration",
        html: `
        <p>Dear User,</p>
        <p>Your One-Time Password (OTP) for Foodi website Registration is: .</p>
        <p>OTP: <b>${OneTimePassword}</b></p>
        <p>This OTP is valid for 10 minutes. Please do not share this OTP with anyone.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <p>Sincerely,</p>
        <p>Foodi Team</p>
        <p>cherrylantec@gmail.com</p>
      `
     
      }
      transpoter.sendMail(message,(err,info)=>{
        if(err){
          res.json({message:"something went wrong, try again!"})
        }
        res.json({message:"Password reset Email Sent" + info.response});
      });

      res.json({message:"mail success",token:Token})
        
    } catch (error) {
        
       console.log(error)

    }
    

    
}

const verifyOTP = async(req,res)=>{
 try {
    // const{OTP} = req.body
    const {OTPtoken} = req.body
    const{OTP} = req.body
    const secretKey = process.env.OTP_KEY
    // res.json(`this is ${OTP} and token is ${OTPtoken}`)

        const decoded = jwt.verify(OTPtoken,secretKey);
        console.log(decoded);
        // res.json(decoded)
        if(decoded.OTP == OTP){
             res.json({message:true})
        }
        else{
          res.json({message:false})
        } // Access payload data
      
    
 } catch (error) {
    res.json(error)
 }
}

export{generateOTP,verifyOTP}