import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import LoginPopup from './components/loginPopup/LoginPopup'
import Policy from './pages/policyPage/Policy'
import Privacy from './pages/policyPage/Privacy'
import Terms from './pages/policyPage/Terms'
import Aboutus from './pages/policyPage/Aboutus'
import VerifyPage from './pages/Verifypage/VerifyPage'
import MyOrders from './pages/MyOrders/MyOrders'
import "./App.css"



const App = () => {

  const [showlogin,setshowlogin] = useState(false)
  return (
    <div className='App'>
      {showlogin ?<LoginPopup Setshowlogin={setshowlogin}/>:<></>}
      <Navbar Setshowlogin={setshowlogin}/>
      <Routes>
         <Route path='/' element={<Home/>}></Route>
         <Route path='/cart' element={<Cart/>}></Route>
         <Route path='/order' element={<PlaceOrder/>}></Route>
         <Route path='/policy' element={<Policy/>}></Route>
         <Route path='/PrivacyPolicy' element={<Privacy/>}></Route>
         <Route path='/terms' element={<Terms/>}></Route>
         <Route path='/aboutus' element={<Aboutus/>}></Route>
         <Route path="/verify" element={<VerifyPage/>}></Route>
         <Route path='/myorder' element={<MyOrders/>}></Route>
      </Routes>
      
   
    </div>
  )
}

export default App