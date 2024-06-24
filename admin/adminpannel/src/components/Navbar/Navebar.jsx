import React, { useEffect, useState } from 'react'
import "./Navebar.css"
import {assets} from '../../assets/assets.js'
import axios from 'axios'


const Navebar = ({url}) => {
  const[apiConnect,setApiConnect]=useState(false)
  const checkConnection = async()=>{
      const responce = await axios.get(`${url}/`).catch((error)=>{alert(error)})
      if(responce){
        setApiConnect(responce.data)
      }
      else{
        setApiConnect(false)
      }

      
  }
  useEffect(()=>{checkConnection()},[])
  return (<>

    <div className='navbar'>
        <img className='logo' src={assets.logo} alt=''/>
        {apiConnect?<p>{apiConnect}</p>:<p>waiting for connection..</p>}
        <img className='profile' src={assets.profile_image} alt=''/>
         
    </div>
    </>
  )
}

export default Navebar