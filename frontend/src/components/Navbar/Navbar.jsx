import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const navbar = ({Setshowlogin}) => {
  const [menu,setmenu]=useState('')
  const {getTotalCartAmount,token,setToken,userName,showmenubar,setcontachhilight, setshowmenubar} = useContext(StoreContext)
  const navigate = useNavigate();
  const logout =() =>{
      localStorage.removeItem("token")
      localStorage.removeItem("UserName")
      setToken("")
      navigate("/")
  }

  return (
    <div className='navbar'>
      <Link to={'/'}onClick={()=>(setmenu('home'), setshowmenubar(true))}><img src={assets.logo} alt="" className="logo" /></Link>
      {showmenubar ?
        <ul className="navbar-menu">
        <Link to={'/'} onClick={()=>setmenu('home')} className={menu === "home" ?'active':''}>Home</Link>
        {menu === "OrderPage" || menu === "contact-us"?<></>: <a href='#explore-menu' onClick={()=>setmenu('menu')}  className={menu === "menu" ?'active':''}>Menu</a>}
       
        <Link to={'/myorder'} onClick={()=>setmenu('OrderPage')}  className={menu === "OrderPage" ?'active':''}>Order Page</Link>
        <a href='#footer' onClick={()=>(setmenu('contact-us'),setcontachhilight(true))}  className={menu === "contact-us" ?'active':''}>Contact-Us</a>
      </ul>
      :<></>}
    
      <div className="navbar-right">
 
        <div className="navbar-search-icon">
         <Link to={'/cart'}><img className='basketimage' src={assets.basket_icon} alt=""/></Link> 
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>Setshowlogin(true)}>sign in</button>:<div className="navbar-profile">
          <span className='profile_bacg' style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}><img width={30} src={assets.profile_icon} alt=''/>{userName?<p>{userName}</p>:<></>}</span>
         
          <ul className="nav-profile-dropdown">

          <Link to={'/myorder'}><li><img src={assets.bag_icon} alt="image" /><p>Orders</p></li></Link>
          <hr />
          <li onClick={logout}><img src={assets.logout_icon} alt="image" /><p>Logout</p></li>
          <hr />
          <Link to={'/cart'}><li><img src={assets.bag_icon} alt="image" /><p>Cart</p></li></Link>
          <Link to={'/cart'}><li><img src={assets.bag_icon} alt="image" /><p>Home</p></li></Link>
          </ul>
       
          </div>}
      
      </div>
    </div>
  )
}

export default navbar