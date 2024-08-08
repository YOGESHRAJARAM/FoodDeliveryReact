import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
// import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // const url = "https://food-del-backend-9w5x.onrender.com"
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [userName, setUserName] = useState("");
  const [showmenubar, setshowmenubar] = useState(true);
  const [contacthilight, setcontachhilight] = useState(false);

  const addToCart = async (itemId) => {
    if (token) {
      if (!cartItems[itemId]) {
        setCartItems((pre) => ({ ...pre, [itemId]: 1 }));
      } else {
        setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }));
      }
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    } else {
      return alert("login To Add Food");
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const fetchFoodList = async () => {
    const responce = await axios.get(url + "/api/food/list");
    setFoodList(responce.data.data);
  };
  const loadCartData = async (token) => {
    const responce = await axios.post(
      url + "/api/cart/get",{},{ headers: { token } });
    setCartItems(responce.data.cartData);
  };

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
    setToken,
    setUserName,
    userName,
    showmenubar,
    setshowmenubar,
    contacthilight,
    setcontachhilight,
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      try {
        if (localStorage.getItem("token")) {
          const localdate = localStorage.getItem("token")
          const responce =await axios.post(url +"/api/OTP/verifyExpire",{token:localdate});
         
          if (responce.data.success) {
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
            if (localStorage.getItem("UserName")) {
              setUserName(localStorage.getItem("UserName"));
            }
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("UserName");
          }
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("UserName");
      }
    }
    loadData();
  }, []);
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
