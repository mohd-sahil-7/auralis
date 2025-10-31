import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Checkout.css'
import axios from 'axios';
import toast from 'react-hot-toast';
function Checkout() {
    const user =JSON.parse(localStorage.getItem("user")) || {};
    const [cart,setCart] = useState(() => user.cart || []) ;
    const nav = useNavigate()
    const [details, setDetails] = useState({
        name:"",
        address:"",
        phone:""
    });

    const handleChange = (e)=>{
        setDetails({...details,[e.target.name]:e.target.value});
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!cart){ alert("Cart is empty")}
        else{
            
        const orderDetails ={
            id: Date.now(),
            cart:cart,
            total: cart.reduce(
                (acc,item) => acc + item.price * item.quantity,0
            ),
            details,
            date: new Date().toISOString()
        };
        const updatedUser = {
            ...user,
            orders:[...(user.orders || []), orderDetails],
            cart:[]
        };
        localStorage.setItem("user", JSON.stringify(updatedUser))
        sessionStorage.setItem("orderDetails", JSON.stringify(orderDetails))
        axios.post("https://auralis-2.onrender.com/allOrders",{orderDetails})
        axios.patch(`https://auralis-2.onrender.com/users/${user.id}`, {cart:[], orders:[...(user.orders || []), orderDetails]})
        toast.success("Order placed successfully")
        nav('/Invoice');
        }
        
    }
  return (
    <div className='orderBody'>
    <div className='orderDetailsCon'>
        <form onSubmit={handleSubmit} className='orderForm'>
        <h1>Enter your details</h1>
            <input type="text" className='input' name="name" placeholder='Fullname : ' onChange={handleChange} required/>
            <input type="text" className='input' name="address" placeholder='Address : ' onChange={handleChange} required />
            <input type="text" className='input' name="phone" placeholder='Phone : ' onChange={handleChange} required />
            <select className='input'>
                <option value="">COD</option>
                <option value="">UPI</option>
            </select>
            <input type="submit" value="Place Order" className='submit'/>
        </form>
    </div></div>
  )
}

export default Checkout