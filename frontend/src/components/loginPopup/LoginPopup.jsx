import React, { useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const LoginPopup = ({Setshowlogin}) => {

    const {url,setToken} = useContext(StoreContext)
    const [currState,setCurrState] = useState("Login")
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
        const responce = await axios.post(otpurl,{email:data.email})
        console.log(responce.data.token)
        setotptoken(responce.data.token) 
        toast("OTP send successfully")
      } catch (error) {
        
      }
        
      
    }
   const handlotpverify = async()=>{
        try{
            const responce = await axios.post(url+"/api/OTP/verify",{
                OTP:data.OTP,
                OTPtoken:otptoken
              })
              console.log(responce.data.message)
              if(responce.data.message){
              
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
        if(currState === "Login"){
            newUrl += "/api/user/login"
        }else{
            if(!otpVerifyed){
                alert("verify otp first")
                return
            }
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            Setshowlogin(false)
        }
        else{
            alert(response.data.message)
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
                <img onClick={()=>Setshowlogin(false)} src={assets.cross_icon} alt='image'/>
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:  <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>}
                <input type='email' disabled={otpVerifyed} name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required/>
                <input type='password' name='password' onChange={onChangeHandler} value={data.password} placeholder='password' required/>
                {currState !== "Login"? <div>{otpVerifyed?<div>
               <span style={{display:'flex',gap:2,marginLeft:10}}>OTP Verifyed Successfully  <img width={20} src={assets.verifyed} alt='Success'/></span>

                </div>:<div>
                {otpbtn?<button type='button' onClick={handleOtp}>Sent OTP</button>:<button type='button' onClick={handlotpverify}>Verify</button>}
                
                <ToastContainer />   
                    <input  style={{marginTop:5}} type='password' name='OTP' onChange={onChangeHandler} value={data.OTP} placeholder='OTP' required/>
                    </div>}
                  
                </div>:<></>}
               
            </div>
            <button type='submit'>{currState==="Sign up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type='checkbox' required/>
                <p>by continuing, i agree to the term of use & privacy.</p>
            </div>
            {currState==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
            :<p>Already have an account <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup