import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"

const generateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const { OtpType } = req.body;
    if (!email) {
      console.log("nomail");
      return;
    } else if (OtpType === "REG") {
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.json({ success: false, message: "useralready exists" });
      }
    } else if (OtpType === "FPW") {
      let exists = await userModel.findOne({ email });
      // exists = {...exists,verifyed:true}

      if (!exists) {
        return res.json({ success: false, message: "User not Exist" });
      }
      // console.log(exists.verifyed)
    }

    const OneTimePassword = Math.random().toString(36).slice(-6);

    const generateJWT = () => {
      const secret = process.env.OTP_KEY;
      const payload = {
        OTP: OneTimePassword,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "10m" });

      console.log(token);
      return token;
    };

    const Token = generateJWT();

    const transpoter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bablusoftware12@gmail.com",
        pass: "yobg nmjt xrpw bdzd",
      },
    });
    const message = {
      from: "bablusoftware12@gmail.com",
      to: email,
      subject: "Your OTP for Foodi Site Registration",
      html: `
        <p>Dear User,</p>
        <p>Your One-Time Password (OTP) for Foodi website Registration is: .</p>
        <p>OTP: <b>${OneTimePassword}</b></p>
        <p>This OTP is valid for 10 minutes. Please do not share this OTP with anyone.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <p>Sincerely,</p>
        <p>Foodi Team</p>
        <p>cherrylantec@gmail.com</p>
      `,
    };
    transpoter.sendMail(message, (err, info) => {
      if (err) {
        res.json({ message: "something went wrong, try again!" });
      }
      res.json({ message: "Password reset Email Sent" + info.response });
    });

    res.json({ message: "OTP Send Successfully", token: Token });
  } catch (error) {
    console.log(error);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { OTPtoken } = req.body;
    const { OTP } = req.body;
    const { OtpType } = req.body;
    const { email } = req.body;
    const secretKey = process.env.OTP_KEY;

    if (OtpType === "REG") {
      const decoded = jwt.verify(OTPtoken, secretKey);
      console.log(decoded);

      if (decoded.OTP == OTP) {
        return res.json({ message: true });
      } else {
        return res.json({ message: false });
      }
    } else if (OtpType === "FPW") {
      const decoded = jwt.verify(OTPtoken, secretKey);

      if (decoded.OTP == OTP) {
        try {
          let UserDetail = await userModel.findOne({ email });

          UserDetail.PasswordResetReq = true;
          UserDetail.save();

          return res.json({ message: true });
        } catch (error) {
          res.json({ message: false });
        }
      } else {
        res.json({ message: false });
      }
    }
  } catch (error) {
    res.json(error);
  }
};

const ResetPassword = async (req,res)=>{
    const {email,password}= req.body
    try {

      let user = await userModel.findOne({email})
      if(user.PasswordResetReq == true){
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password,salt)
        user.password = hasedPassword
        user.PasswordResetReq = false
        await user.save()
        return res.json({success:true,message:"Password reset successfully"})
      }
      else{
        res.json({success:false})
      }
      
    } catch (error) {
      console.log(error)
    }
  
}

export { generateOTP, verifyOTP,ResetPassword};
