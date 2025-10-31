import React from 'react'
import AdminNav from '../Components/AdminNav'
import styles from '../Styles/Dashboard.module.css'
import axios from 'axios'
import { useState } from 'react'
function Dashboard() {
  const [users,setUsers] = useState([]);
  const [products,setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  axios.get("https://auralis-2.onrender.com/users").then(res=> setUsers(res.data))
  axios.get("https://auralis-2.onrender.com/products").then(res=> setProducts(res.data))
  axios.get("https://auralis-2.onrender.com/allOrders").then(res=> setOrders(res.data))

  const blocked = users.filter(i => i.status=="blocked")
  const revenue = orders.reduce((acc, curr)=> acc = acc + curr.orderDetails["total"],0)

  return (
    <div className={styles.body}> 
      <AdminNav/>   
      <div className={styles.details}>

        <div className={styles.tUsers}>
          <section><h2>Total Users</h2>
          <h2 style={{fontSize:'5rem'}}>{(users.length===0)? "..." : users.length}</h2></section>
          <section><h2>Total Products</h2>
          <h2 style={{fontSize:'5rem'}}>{products.length}</h2></section>
        </div>
        <div className={styles.bUsers}><h2>Blocked Users</h2>
          <h2 style={{fontSize:'5rem'}}>{blocked.length}</h2>
        </div>
        <div className={styles.tRevenue}><h2>Total Revenue</h2>
          <h2 style={{fontSize:'5rem'}}> ₹ {revenue}</h2>
        </div>
      </div>
    </div>
  )
}

export default Dashboard