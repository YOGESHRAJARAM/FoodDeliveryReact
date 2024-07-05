import React, { useContext} from 'react'
import './fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const FoodItem = ({id,name,price,description,image}) => {
  // const [itermcount,Setitermcount]=useState(0)
  const { cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)
  return (
    <div className="food-item">
         <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/images/"+image} alt='image'/>
            {!cartItems[id] ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}></img>:<div className='food-item-counter'>
              <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)}/>
              <p>{cartItems[id]}</p>
              <img src={assets.add_icon_green} onClick={()=>addToCart(id)}/>
              </div>}
         </div>
         <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt='image'/>
            </div>
            <p className='food-item-dec'>{description}</p>
            <p className='food-item-price'>Rs{price}</p>
         </div>
    </div>
  )
}

export default FoodItem