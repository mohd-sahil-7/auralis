import React, { useEffect, useState } from "react";
import './Checkout.css'
import axios from 'axios'

function Invoice() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = JSON.parse(sessionStorage.getItem("orderDetails"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (storedOrder) {
      setOrder(storedOrder);

      sessionStorage.removeItem("orderDetails");
    }
      if (user) {
        const updatedUser = { ...user, cart: [] };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        axios.patch(`https://auralis-2.onrender.com/users/${user.id}`, { cart: [] });
      
    }
  }, []);

  if (!order || !order.cart || order.cart.length === 0) {
    return <h1>No order found</h1>;
  }

  const total = order.cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="invoiceCon">
      <div className="invoice">
        <h1 style={{color:"#13315C"}}>Order Placed!</h1>
        <h2 style={{color:"#13315C"}}>Thank you, {(order.details).name}</h2>
        <h5>Address: {(order.details).address}</h5>
        <h5>Phone: {(order.details).phone}</h5>

        <h3 style={{color:"#13315C"}}>Order Summary:</h3>
        <ul>
          {order.cart.map(item => (
            <>
            <li key={item.id}>
              <img src={item.image} className="invoiceIMG"/>
              <b>{item.name} <br /> {item.type} <br /> ₹{item.price} </b> <br /> 
              ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity} 
            </li>
            <hr  style={{width:'50%'}}/></>
          ))}
        </ul>

        <h2 style={{color:"#13315C"}}>Total: ₹{total}</h2>
      </div>
    </div>
  );
}

export default Invoice;
