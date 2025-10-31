import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
function Cart() {
  const nav = useNavigate()
  const user =JSON.parse(localStorage.getItem("user")) || {};
  const [cart,setCart] = useState(() => user.cart || []) ;
   

  //remove item from cart
  const removeItem = (id)=>{
    const newCart = cart.filter(item => item.id !== id)
    const updatedUser =  {...user, cart:newCart}
    setCart(newCart);

    axios.patch(`https://auralis-2.onrender.com/users/${user.id}` , {cart:newCart})
    localStorage.setItem("user", JSON.stringify(updatedUser))
    toast.success("Item Removed Successfully")
  }
   
  //quantity +
  const qtyInc = (id) =>{
    const newCart = cart.map(item => 
      item.id === id ? {...item, quantity: item.quantity +1}:
     item
    )
    const updatedUser = {...user,cart:newCart}
    setCart(newCart);

    axios.patch(`https://auralis-2.onrender.com/users/${user.id}` , {cart:newCart})
    localStorage.setItem("user", JSON.stringify(updatedUser))


  }

  //quantity - 
  const qtyDec = (id) =>{
    const newCart = cart.map(item => {
      if(item.id === id){
        if(item.quantity > 1){
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }
      return item;
    })
    const updatedUser = {...user,cart:newCart}
    setCart(newCart);

    axios.patch(`https://auralis-2.onrender.com/${user.id}` , {cart:newCart})
    localStorage.setItem("user", JSON.stringify(updatedUser))


  }

  
    
  return (
    <div className='cartBody'>
      {cart.length > 0 ?
      (cart.map(item =>
          <div className="cartProductList">
          <div key={item.id} className='cartProduct'>
            <img src={item.image} className='cartImg' />
            <div className='cartPdDetails'>
              <h3>{item.name}</h3>
              <h5>Brand : {item.brand}</h5>
              <h5>Price : ₹{item.price}</h5>
              <h5>Quantity: <button className='Qty' onClick={()=>qtyInc(item.id)}>+</button>
               {item.quantity} 
               <button className='Qty' onClick={()=>qtyDec(item.id)}> - </button> </h5>
              <button className='removeBut' onClick={()=> removeItem(item.id)}>Remove Item</button>
            </div>
          </div>
        </div>
        )):(<div style={{padding:"10px"}}>
          <h1 style={{fontWeight:'bold'}}>Cart is empty...</h1>
          <h4>Add something to cart to see...</h4>
          <button className='shopNow' onClick={ () => nav('/Shop')}>Shop now</button>
          </div>
        ) 
         }
        { cart.length>0?<div className='cartFooter'>
          <h2>Total Price : ₹ {cart.reduce((acc, current) =>acc + (current.price * current.quantity), 0 )}/-</h2>
          <button className='checkout' onClick={()=> nav('/Checkout')}>Checkout</button>
        </div>:""}
        
    </div>
  )
}

export default Cart