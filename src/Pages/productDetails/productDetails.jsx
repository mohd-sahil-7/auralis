import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './productDetails.css'
import toast from 'react-hot-toast'

function ProductDetails() {
  const nav = useNavigate()
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [features, setFeatures] = useState([])

    // Cart functions
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const [cart, setCart] = useState(() => (user && user.cart) || []);
    const [wishlist, setWishlist] = useState(()=> (user&& user.wishlist) || []);

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
    toast.success("Product added to cart")
  };

  const addToWishlist = (product) => {

    if(!user){
      toast.error("Please login to use wishlist")
      nav('/Login')
      return
    }
    
    const exists = wishlist.find(item => item.id === product.id)
    let updatedWishlist;

    if(!exists){
      toast.success("Product added to wishlist")
      updatedWishlist = [...wishlist,{...product}]
    }else{
      toast.error("Product is already in the wishlist")
      updatedWishlist = [...wishlist]
    }

    setWishlist(updatedWishlist);

    const updatedUser = {...user, wishlist: updatedWishlist}
    localStorage.setItem("user", JSON.stringify(updatedUser))
    axios.patch(`http://localhost:3000/users/${user.id}`,{wishlist:updatedWishlist})
    

  }

    
    useEffect(()=>{
        axios.get(`http://localhost:3000/products/${id}`).then((res) =>{ 
          setProduct(res.data)
          setFeatures(res.data.features)})
    },[id])

    if (!product) return <p>Loading...</p>

  return (
    <div className='productDetails'>
        <div className='product'>
         <img src={product.image} alt="" className="imageCont" />
          <div className="details">
            <h1 className='dTitle'>{product.name}</h1>
            <div><h3><b>Brand </b>: {product.brand}</h3>
            <h3><b>Type </b>: {product.type}</h3>
            <h3><b>Price </b>: ₹{product.price}</h3>
            <h3><b>Description </b>: {product.description}</h3></div>
            
            <div className='buttons'>
              <button className='button' onClick={()=> addToWishlist(product)}>Add to wishlist</button>&nbsp;
              <button className='button' onClick={()=>addToCart(product)}>Add to cart</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProductDetails