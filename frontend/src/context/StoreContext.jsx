import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios"
// import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // const url = "https://food-del-backend-9w5x.onrender.com"
  const url = "http://localhost:4000"
  const [token,setToken] =useState("")
  const [food_list,setFoodList] = useState([])

  const addToCart = async (itemId) =>  {
   
    if(token){
      if (!cartItems[itemId]) {
        setCartItems((pre) => ({ ...pre, [itemId]: 1 }));
      } else {
        setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }));
      }
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
    else{
      
      return alert("login and try")
    }
  };


  const removeFromCart = async (itemId) => {
    setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }

  };

  const fetchFoodList = async()=>{
       const responce = await axios.get(url+"/api/food/list");
       setFoodList(responce.data.data)
     
  }
  const loadCartData = async(token)=>{
    const responce = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(responce.data.cartData)
  }

  const getTotalCartAmount = () => {
    let totaAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totaAmount += itemInfo.price * cartItems[item];
      }
    }
    return totaAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  useEffect(()=>{
 
    async function loadData(){
        await fetchFoodList()
        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"))
          await loadCartData(localStorage.getItem("token"))
        }
    }
    loadData();
  },[])
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
