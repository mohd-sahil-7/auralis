import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
function Shop() {

  const nav = useNavigate()

  const[items, setItems] = useState([])
  const[filteredItems, setFilteredItems] = useState([])

  const [brand, setBrand] = useState('Any')
  const [type, setType] = useState('Any')
  const [sort, setSort] = useState('none')
  const [search, setSearch] = useState('')

  //Cart function

  const user = JSON.parse(localStorage.getItem("user")) || null ; 
  const [cart, setCart] = useState((user && user.cart) || [])

  const addToCart = (product) =>{
    if(!user) {
      toast.error("Please Login to use cart")
      nav('/Login')
      return
    } 

    const exists = cart.find(item => item.id === product.id)
    let updatedCart;

    if(exists){
      updatedCart = cart.map(item=>item.id === product.id? {...item,quantity: item.quantity +1}: item);
    } else{
      updatedCart = [...cart,{...product, quantity:1 }];
    }

    setCart(updatedCart);

    const updatedUser = {...user, cart:updatedCart};
    localStorage.setItem("user", JSON.stringify(updatedUser));
    axios.patch(`https://auralis-2.onrender.com/users/${user.id}`,{cart:updatedCart})
    toast.success("Product added to cart")
    
  };

  useEffect(()=>{axios.get("https://auralis-2.onrender.com/products").then((res)=>{  
    setItems(res.data)
    setFilteredItems(res.data)
   })},[]) 

  useEffect(()=>{
    let data = [...items]

    // Brand
    if(brand !== 'Any'){
     data = data.filter(d => d.brand === brand);
    }

    // Type
    if(type !== 'Any'){
      data = data.filter(d => d.type === type);
    }

    // Sort
    if(sort === 'priceLow'){
      data.sort((a,b)=> a.price - b.price)
    }
    else if(sort === 'priceHigh'){
      data.sort((a,b)=> b.price - a.price)
    }
    // Search
    if(search.trim() !== ""){
      data = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredItems(data)
  },[brand,type,sort,search])

  return (
    <div className='shopBody'>
      <div className='shopNav'>
        <div className='shopFilter'>
        <label>Brand : <select className='dropDown' value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option>Any</option>
          <option>boAt</option>
          <option>Zebronics</option>
          <option>JBL</option>
          <option>Sony</option>
          <option>Apple</option>
          <option>Samsung</option>
        </select></label>
        <label>Type : <select className='dropDown' value={type} onChange={(e) => setType(e.target.value)}>
          <option>Any</option>
          <option>Headphone</option>
          <option>Earphone</option>
          <option>TWS</option>
          <option>Neckband</option>
        </select></label>
        <label>Sort by : <select className='dropDown' value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">None</option>
          <option value="priceLow">Price (Lowest to Highest)</option>
          <option value="priceHigh">Price (Highest to lowest)</option>
        </select></label>
        </div> 
          <div style={{display:'flex', alignItems:'center',width:'50%'}}> 
          <input type="text"
          className='searchBox' 
          placeholder='Search Something...' 
          value={search} onChange={(e) => setSearch(e.target.value)}/> 
          </div>
      </div>
      
      <div className='productContainer'>
        {filteredItems.length > 0 ? 
          (filteredItems.map((item) =>
          <div key={item.id} className='productCard' onClick={() => nav(`/Product/${item.id}`)}>
          <img src={item.image} className='productImg'/>
          <section>
          <h5 style={{color:"#0B2545", fontWeight:'bold'}}>{item.name}</h5>
          <span style={{fontWeight:'bold'}}>Price : ₹{item.price}</span><br />
          <span style={{fontWeight:'bold'}}>Brand : {item.brand}</span>
          </section>
          <button className="viewBut" onClick={(e)=>{ e.stopPropagation(); addToCart(item)}}>Add to cart</button>
          </div> )) : 
          (<h2 style={{fontWeight:'bold', margin:'10px',color:'#13315C'}}>No items found...</h2>)}
        
      </div>

    </div>
  )
}

export default Shop