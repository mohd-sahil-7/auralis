import React, { useEffect } from 'react'
import AdminNav from '../Components/AdminNav'
import styles from '../Styles/Users.module.css'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
function Users() {
    const [users,setUsers] = useState([]);
    const current = JSON.parse(localStorage.getItem("user"))
    useEffect(()=> {
      axios.get("http://localhost:3000/users").then(res=> setUsers(res.data))
    },[])
    

    const toggleBlock = (id,currentStatus) =>{
      const status = currentStatus=== "blocked" ? "active" : "blocked"

      axios.patch(`http://localhost:3000/users/${id}`, {status : status})
        .then(()=>{
          setUsers(users.map((u)=>
          u.id===id? {...u, status:status}: u ));
        })
    }

    const toggleRole = (id,currentRole) =>{
      const role = currentRole=== "admin" ? "user" : "admin"

      axios.patch(`http://localhost:3000/users/${id}`, {role : role})
        .then(()=>{
          setUsers(users.map((u)=>
          u.id===id? {...u, role:role}: u ));
        })
        
    }

    const removeUser = (id) => {
      const newUsers = users.filter(u => u.id !== id)
      axios.delete(`http://localhost:3000/users/${id}`)
       .then(setUsers(newUsers))
       toast.success("Removed user successfully")
    }

  return (
    <div className={styles.body}>
    <AdminNav />
    <div className={styles.users}>
      {(users.length===0)?<h2>Loading...</h2> : <h2>All Users</h2>}
        <div className={styles.usersCon}>
            {users.map((user)=>
            <div  className={styles.user} key={user.id}>
                <h6><i> ID : #{user.id}</i> </h6>
                <b>Username : {user.userName}  {(user.id === current.id)? <i style={{color:'rgb(0, 0, 150)'}}>(You)</i> : ""} <br />
                    Email ID : {user.email} <br />
                    Password : {user.pass} <br />
                    Total orders : {user.orders.length} <br />
                    Total spent : ₹{user.orders.reduce((acc,curr) => acc = acc + curr.total,0 )}</b><br />
                    <div style={{padding:'5px 10px',margin:'5px',backgroundColor:'white',display:'inline-block',borderRadius:'5px'}}>
                      {user.role === "admin"?
                      "Admin" : "User" }</div>
                      
                      {user.status === "blocked"?
                      <div style={{padding:'5px 10px',margin:'5px',backgroundColor:'#ffcece',display:'inline-block',borderRadius:'5px'}}>
                      Blocked
                      </div> :
                      <div style={{padding:'5px 10px',margin:'5px',backgroundColor:'#d5ffce',display:'inline-block',borderRadius:'5px'}}> Active
                      </div> }<br />
                    <button className={styles.button} disabled={user.id===current.id} onClick={()=>removeUser(user.id)}>Remove User</button>
                    <button className={styles.button} disabled={user.id===current.id} onClick={()=>toggleBlock(user.id,user.status)}>
                      {user.status === "active" ? "Block User" : "Unblock"}</button>
                    <button className={styles.Rbutton} disabled={user.id===current.id} onClick={()=>toggleRole(user.id,user.role)}>
                      Change Role</button>
            </div>
            )}
        </div>
    </div>
    </div>
  )
}

export default Users