import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'
import {Link} from 'react-router-dom'


const Footer = () => {
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt='image'/>
                <p>Welcome to your one-stop shop for all things tomato! Whether you're a seasoned chef or a home cook looking for inspiration, this website is your guide to exploring the versatility and vibrancy of this amazing foods</p>
                 <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt=''/>
                    <img src={assets.twitter_icon} alt=''/>
                    <img src={assets.linkedin_icon} alt=''/>
                 </div>
            </div>
            <div className="footer-content-center">
                <h2>Cherry Land</h2>
                <ul>
                    <li>Home</li>
                    <li><Link to={"/aboutus"}>About Us</Link></li>
                    <li>Delivery</li>
                    <li><Link to={"/PrivacyPolicy"}>PrivacyPolicy</Link></li>
                    <li><Link to={"/policy"}>cancellation and refund policy</Link></li>
                </ul>

            </div>
            <div className="footer-content-right">
                <h2>Contact Us</h2>
                <ul>
                    <li>+91 9080194557</li>
                    <li><a href="mailto:cherrylandtec@gmail.com">cherrylandtec@gmail.com</a></li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'> Copyright 2024 @ Cherryland.com - All Right Reserved <Link to={"/terms"}>Terms and Condition</Link></p>
    </div>
  )
}

export default Footer