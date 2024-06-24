import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({Setshowlogin}) => {

    const {url,setToken} = useContext(StoreContext)
    const [currState,setCurrState] = useState("Login")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })
   
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data=>({...data,[name]:value}))

    }

    const onLogin = async(event) =>{
        event.preventDefault()
        let newUrl = url;
        if(currState === "Login"){
            newUrl += "/api/user/login"
        }else{
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

  return (
    <div className="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>Setshowlogin(false)} src={assets.cross_icon} alt='image'/>
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:  <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>}
                <input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required/>
                <input type='password' name='password' onChange={onChangeHandler} value={data.password} placeholder='password' required/>
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