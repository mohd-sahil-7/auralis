import React from 'react'
import {useNavigate, Link, useLocation} from 'react-router-dom'
function NavBar() {

    const loc = useLocation()  
    const nav = useNavigate();
    const list ={width:'40%', height:'100%', display:'flex',alignItems:'center',fontWeight:'bold',fontSize:'20px'}
    const title ={margin:'50px', fontWeight:'bold',fontFamily:'snes',fontSize:'75px'}
    
    function handleClick(){
        nav('/Login')
    }

  return (
    <div className='navContainer'>
        <div className='navTitle'><h2 style={title}>AURALIS</h2></div>
        <div style={list} ><ul className='navItems'>
            <li><Link to="/" className={loc.pathname ==='/'||loc.pathname==='/home'? "activeLink" : "link"}>Home</Link></li>
            <li><Link to="/Shop" className={loc.pathname ==='/Shop'? "activeLink" : "link"}>Shop</Link></li>
            <li><Link to="/Wishlist" className={loc.pathname ==='/Wishlist'? "activeLink" : "link"}>Wishlist</Link></li>
            <li><Link to="/Cart" className={loc.pathname ==='/Cart'? "activeLink" : "link"}>Cart</Link></li>
            <li>{(localStorage.getItem("isLoggedIn") === "true")?
            <Link to="/Profile" className={loc.pathname ==='/Profile'? "activeLink" : "link"}>Profile</Link> :
              <button className='logBut' onClick={handleClick}>Login</button> }</li>
            </ul></div>
    </div>
  )
}

export default NavBar