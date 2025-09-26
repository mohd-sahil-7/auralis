import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'
import toast from 'react-hot-toast'
function Banner() {
    const [img,setIMG]= useState([])
    const [fdItems, setFdItem] = useState([])
    const nav = useNavigate()

  useEffect(()=>{
    axios.get("http://localhost:3000/products").then(res=> setIMG(res.data))
  },[])  
  useEffect(()=>{
    axios.get("http://localhost:3000/products?featured=true").then((arr)=> setFdItem(arr.data))
  },[])  
  
  // Cart Functionality
  const user = JSON.parse(localStorage.getItem("user")) || null;
    const [cart, setCart] = useState(() => (user && user.cart) || []);

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
    axios.patch(`http://localhost:3000/users/${user.id}`,{cart:updatedCart})
    toast.success("Product added to cart ")
  };

  return(
      <div className='banBody'>
        {/* Hero Section */}
        <div className='heroSec'>
          <div><h2  className='banHead'>Hear the  <span style={{margin:'0px 10px', color:'#13315C'}}> DIFFERENCE</span>
          </h2><br /> 
           <h3 style={{fontFamily:'impact', marginTop:'-10px',opacity: 1,transform:' translateX(0)',animation: 'fadeHead 2s'}}>“Immerse yourself in pure, high-definition sound.”</h3>
           <button className='shopBut' onClick={()=> nav('/Shop')}>Shop Now </button>
           </div>
          <img src='/assets/boAt Rockerz 412 (No bg).png' className='topImg'/>
        </div>

        {/* Feautured Products */}
        <div className='fdProducts'>
        <h2 >Featured Products</h2>
         <div className='fdItemContainer'>
         {fdItems.map(item => (<div className='itemCard' key={item.id}><img src={item.noBG} className='fdItem'/>
          <h5 style={{color:"#0B2545", fontWeight:'bold'}}>{item.name}</h5>
          <span style={{fontWeight:'bold'}}>Price : ₹{item.price}</span>
          <section>
          <button className='viewBut' onClick={() => nav(`/Product/${item.id}`)}>View Item</button>
          <button className='viewBut' onClick={() =>addToCart(item)}>Add to cart</button>
          </section>
         </div>))}
         </div>
        </div>
      </div>
  )
}

export default Banner