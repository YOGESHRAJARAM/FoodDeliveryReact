import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/fooddisplay/FoodDisplay'


const Home = () => {
  const [Category,setCategory]=useState("all")
  return (
    <>
     <Header/>
     <ExploreMenu category={Category} setcategory={setCategory}/>
     <FoodDisplay category={Category}/>
    </>
  )
}

export default Home