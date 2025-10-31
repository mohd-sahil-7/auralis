import React from 'react'
import '../Styles/wishlist.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
function Wishlist() {
  const nav = useNavigate()
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [wishlist, setWishlist] = useState(()=> user.wishlist || []);
  const [cart, setCart] = useState(()=> user.cart ||  [])

  const addToCart = (product) => {
    if (!user) {
      toast.error("Please Login to use cart")
      nav('/Login')
      return 
    }
      
     const exists = cart.find(item => item.id === product.id);
    let updatedCart;

    if (exists) {
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);

   
    const updatedUser = { ...user, cart: updatedCart };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    axios.patch(`https://auralis-2.onrender.com/users/${user.id}`,{cart:updatedCart})
     toast.success("Product added to cart")
    
  };

  const removeItem = (id) =>{
    const newWishlist = wishlist.filter(item => item.id !== id)
    const updatedUser = {...user, wishlist:newWishlist}
    setWishlist(newWishlist)


  axios.patch(`https://auralis-2.onrender.com/users/${user.id}`, {wishlist:newWishlist})
  localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  

  return (
    <div className="wishlistBody">
      <div className='productList'>
     {wishlist.length > 0? 
     (wishlist.map( item =>
     
      <div className='productCon' onClick={()=> nav(`/Product/${item.id}`)}>
        <img src={item.image} className='wishImg'/>
        <div className='wishListDetails'>
          <h3>{item.name}</h3>
          <h5>{item.type}</h5>
          <h5>{item.brand}</h5>
          <div>
            <button className='wishListBut' onClick={(e)=>{e.stopPropagation(); addToCart(item)}}>Add to cart</button>
            <button className='wishListBut' onClick={(e)=>{ e.stopPropagation(); removeItem(item.id)}}>Remove from wishlist</button>
          </div>
        </div>
      </div>
     )):
     (<h1 style={{fontWeight:'bold'}}>Nothing in the wishlist...</h1>)
     }
     </div>
    </div>
  )
}

export default Wishlist