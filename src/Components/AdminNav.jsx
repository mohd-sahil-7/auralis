import React from 'react'
import styles from '../Styles/AdminNav.module.css'
import {useLocation , Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
function AdminNav(){ 
    const loc = useLocation()
    const nav = useNavigate()

    function handleLogout(){
        toast.success("Logout Successful")
        nav('/Login',{replace:true})
        localStorage.setItem("isLoggedIn","false")
        localStorage.removeItem("user")
    }

  return (
    <div className={styles.body}>
    <h3>Admin Panel</h3>
    <div className={styles.items}>
        <h5><Link to='/Dashboard' className={loc.pathname ==='/Dashboard'? styles.active : styles.link}>Dashboard</Link></h5><hr />
        <h5><Link to='/Users' className={loc.pathname ==='/Users'? styles.active : styles.link}>User Management</Link></h5><hr />
        <h5><Link to='/Products' className={loc.pathname ==='/Products'? styles.active : styles.link}>Product Management</Link></h5><hr />
        <button className={styles.button} onClick={handleLogout}>Logout</button>
    </div>
    </div>
  )
}

export default AdminNav