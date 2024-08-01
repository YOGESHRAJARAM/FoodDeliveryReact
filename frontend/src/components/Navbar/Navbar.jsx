import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const navbar = ({Setshowlogin}) => {
  const [menu,setmenu]=useState('home')
  const {getTotalCartAmount,token,setToken,userName} = useContext(StoreContext)
  const navigate = useNavigate();
  const logout =() =>{
      localStorage.removeItem("token")
      localStorage.removeItem("UserName")
      setToken("")
      navigate("/")
  }

  return (
    <div className='navbar'>
      <Link to={'/'}><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to={'/'} onClick={()=>setmenu('home')} className={menu === "home" ?'active':''}>home</Link>
        <a href='#explore-menu' onClick={()=>setmenu('menu')}  className={menu === "menu" ?'active':''}>menu</a>
        {/* <a href='#footer' onClick={()=>setmenu('OrderPage')}  className={menu === "OrerPage" ?'active':''}>Order Page</a> */}
        <a href='#footer' onClick={()=>setmenu('contact-us')}  className={menu === "contact-us" ?'active':''}>contact-us</a>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <div className="navbar-search-icon">
         <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link> 
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>Setshowlogin(true)}>sign in</button>:<div className="navbar-profile">
          <span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>{userName?<p>{userName}</p>:<></>}<img src={assets.profile_icon} alt=''/></span>
         
          <ul className="nav-profile-dropdown">
          <Link to={'/myorder'}><li><img src={assets.bag_icon} alt="" /><p>Orders</p></li></Link>
          <hr />
          <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>

          </ul>
       
          </div>}
      
      </div>
    </div>
  )
}

export default navbar