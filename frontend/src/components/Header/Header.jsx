import React from 'react'
import './Header.css'
import Spline from '@splinetool/react-spline';
import { useRef } from 'react';
import { assets } from '../../assets/assets';

const Header = () => {
  const splineRef = useRef(null)
  function onLoad(Spline){
    const obj = Spline.findObjectByName('splineRef')
    splineRef.current=obj;
  }
  function moveObj(){
    console.log(cube.current);
    splineRef.current.position.x+=10;
  }
  return (
    <div className="header">
        <div className="header-contents">
            <h2>Order Your favourite food here</h2>
            <p>Choose from a diverse menu featuring a delectable arry of dishes crafted with the finest ingredients and culinary expertise.Our mission is to satisfy your cravings and elevate your dining experience , one delicious meal at a time.</p>
            {/* <button>View Menu</button> */}
  
        </div>
        <img src={assets.headersweet}/>
       {/*<Spline  style={{width:"88%",borderRadius:10}} scene="https://prod.spline.design/qYoIDeWnxTjFLV4N/scene.splinecode"  ref={splineRef}  onLoad={onLoad} onClick={()=>(moveObj)} />
      */} 
  
       
    </div>
  )
}

export default Header