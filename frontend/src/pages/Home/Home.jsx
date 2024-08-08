import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/fooddisplay/FoodDisplay'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'


const Home = () => {
  const [Category,setCategory]=useState("all")
  const {setshowmenubar}= useContext(StoreContext)
  useEffect(()=>(
    setshowmenubar(true)
  ),[])
  return (
    <>
    <div className='homeheader'>
          < Header/>
    </div>
     <ExploreMenu category={Category} setcategory={setCategory}/>
     <FoodDisplay category={Category}/>
    </>
  )
}

export default Home