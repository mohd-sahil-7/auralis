import React from 'react'
import styles from '../Styles/Profile.module.css'
import {useNavigate} from 'react-router-dom'
import NavBar from '../Components/NavBar'
import toast from 'react-hot-toast'
function Profile() {
  const user = JSON.parse(localStorage.getItem("user"))
  const orders = user.orders;
  const nav = useNavigate()

  function handleLogout(){
        toast.success("Logout Successful")
        nav('/Login')
        localStorage.setItem("isLoggedIn","false")
        localStorage.removeItem("user")
    }
  return (
    <>
    <div className={styles.body}>
      <div className={styles.details}>
        <h2>Personal details</h2>
        <img src="/src/assets/profile.jpg" className={styles.pfp}/>
        <h4>Name : {user.userName}</h4>
        <h4>Email : {user.email}</h4>
        <h4>Role : {user.role || "Admin"}</h4>
        <h4>Total orders : {user.orders.length}</h4>
        <button onClick={handleLogout} className={styles.button}>Logout</button>
      </div> 
      <div className={styles.previousOrders}>
        <h2>Previous orders</h2>
        {orders.map(item=> <div key={item.id} className={styles.ordersCon}>
         <h4>Order ID : {item.id}</h4> 
         <h5>Date : {new Date(item.date).toLocaleDateString("en-GB")}</h5><br />
         <h5>Delivery Details:-</h5>
          <h6>&nbsp;Name : {item.details["name"]}</h6>
          <h6>&nbsp;Address : {item.details["address"]}</h6>
          <h6>&nbsp;Phone : {item.details["phone"]}</h6><br />
         <h5>Products :-</h5>
         {item.cart.map(p =>
         <>
         <div className={styles.products}>
          <img src={p.image} className={styles.img}/>
          <div>
            <h6>{p.name}</h6>
            <h6>Price: ₹{p.price}</h6>
            <h6>Quantity: {p.quantity}</h6>
            <h6>Total:- <br />&nbsp;&nbsp;₹{p.price} x {p.quantity} = ₹{p.price*p.quantity}</h6>
          </div>
         </div><hr/>
          </>
         )}
         <h4>Total = ₹{item.total}/-</h4>
        </div>)}
      </div>
    </div></>
  )
}

export default Profile