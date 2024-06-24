import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import LoginPopup from './components/loginPopup/LoginPopup'



const App = () => {

  const [showlogin,setshowlogin] = useState(false)
  return (
    <div className='app'>
      {showlogin ?<LoginPopup Setshowlogin={setshowlogin}/>:<></>}
      <Navbar Setshowlogin={setshowlogin}/>
      <Routes>
         <Route path='/' element={<Home/>}></Route>
         <Route path='/cart' element={<Cart/>}></Route>
         <Route path='/order' element={<PlaceOrder/>}></Route>
      </Routes>
   
    </div>
  )
}

export default App