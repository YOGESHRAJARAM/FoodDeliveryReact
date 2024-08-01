
import React, { useEffect, useState } from 'react'
import './ForgetPassword.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = ({SetShowForgetPassword,Setshowlogin}) => {
    const {url} = useContext(StoreContext)
    const [currState,setCurrState] = useState("Forget Password")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
        OTP:""
    })
    const [otpbtn,setOtpBtn] = useState(true)
    const [otptoken,setotptoken] = useState("")
    const [otpVerifyed,Setoptverifyed] = useState(false)
   
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data=>({...data,[name]:value}))

    }
    const handleOtp= async()=>{
      try {
        if(!data.email){
            toast("Please Enter Vaild Mail Address")
            return
        }
        
        const otpurl = url+'/api/OTP/'
        const responce = await axios.post(otpurl,{email:data.email,OtpType:"FPW"})
  
        setotptoken(responce.data.token) 
        toast(responce.data.message)
      } catch (error) {
        
      }
        
      
    }
   const handlotpverify = async()=>{
        try{
            const responce = await axios.post(url+"/api/OTP/verify",{
                OTP:data.OTP,
                OTPtoken:otptoken,
                OtpType:"FPW",
                email:data.email
              })
           
              if(responce.data.message == true){
              
                Setoptverifyed(true)
              }
              else{
                toast("Wrond Otp")
              }
        }
        catch(error){

        }

   }

    const onLogin = async(event) =>{
        event.preventDefault()
        let newUrl = url;
            if(!otpVerifyed){
                alert("Verify OTP Please")
                return
            }
            newUrl += "/api/OTP/Resetpassword"
        

        const response = await axios.post(newUrl,data);

        if(response.data.success){
            alert("Password reset Successfully")
            SetShowForgetPassword(false)
            Setshowlogin(true)
        }
        else{
            alert("Error during connection")
        }
    }
    useEffect(()=>{
        if(data.OTP.length <= 0){
            setOtpBtn(true)
        }
        else{
            setOtpBtn(false)
        }
      
    },[data.OTP])

  return (
    <div id="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>SetShowForgetPassword(false)} src={assets.cross_icon} alt='image'/>
            </div>
            <div className="login-popup-inputs">
                <input type='email' disabled={otpVerifyed} name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required/>
                 <div>{otpVerifyed?<div>
               <span style={{display:'flex',gap:2,marginLeft:10}}>OTP Verifyed Successfully  <img width={20} src={assets.verifyed} alt='Success'/></span>

                </div>:<div style={{display:'flex',gap:2, flexDirection:'row',alignItems:'center',justifyContent:"center"}}>
                {otpbtn?<button type='button' onClick={handleOtp}>Sent OTP</button>:<button type='button' onClick={handlotpverify}>Verify</button>}
                
                <ToastContainer />   
                    <input style={{flex:1}} type='password' name='OTP' onChange={onChangeHandler} value={data.OTP} placeholder='OTP' required/>
                    </div>}
          
                </div>
                <input type='password' name='password' onChange={onChangeHandler} value={data.password} placeholder='New Password' required/>
            </div>
            <button type='submit'>Change Password</button>
            <p>Back to Login: <span onClick={()=>(SetShowForgetPassword(false),Setshowlogin(true))} style={{cursor:'pointer',fontWeight:"bolder",textDecoration:"underline"}} >Click here</span></p>
           
            <p>Your Password is Safe With Us Need More Help?<a  style={{cursor:'pointer',fontWeight:"bolder",textDecoration:"underline"}}  href="mailto:cherrylandtec@gmail.com">cherrylandtec@gmail.com</a></p>
        
         
        </form>
    </div>
  )

}

export default ForgetPassword








   