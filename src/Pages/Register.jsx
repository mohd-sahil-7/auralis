import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {replace, useNavigate} from 'react-router-dom'
function Register() {
  let [error,setError]=useState({})
  let [email,setEmail]=useState('')
  let [userName,setUserName]=useState('')
  let [pass,setPass]=useState('')

  const nav = useNavigate()

  

function handleSubmit(){
  let error={}



  if(email.trim()==""){
   error.email="! Email is required" 
   setError(error)
   
  }
  if(! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
     error.email="! Invalid Email Format" 
   setError(error)
  }
  if(userName.trim()==""){
   error.userName="! Username is required" 
   setError(error)
   
  }
  
  if(pass.trim()==""){
    error.pass="! Password is required"
    setError(error)
    
  }
  if(Object.keys(error).length==0){
    axios.get(`https://auralis-2.onrender.com/users?email=${email}`).then((res)=>{
      
      if(res.data.length ===0){
        axios.post('https://auralis-2.onrender.com/users',{
        email,
        userName,
        pass,
        role:"user",
        status:"active",
        wishlist:[],
        cart:[],
        orders:[]
       })
         setError({})
         setEmail('')
         setUserName('')
         setPass('')
         nav("/Login",{replace:true})
      }

      else{
        error.email="! Email already in use"
    setError(error)
      }
    })
    
  }

}
  return (
    <div className='regBody'>
    <div className='register'>
        <h2 className='regHead'>Register</h2>
        <div><label>Email ID :&nbsp;&nbsp;&nbsp;<input type='text' className='inputBox' value={email}
         onChange={e=> setEmail(e.target.value)}/>
        </label></div>
        <span className='warning'>{error && error.email}</span>
        <div><label>Username : <input type='text' className='inputBox' value={userName} onChange={e=> setUserName(e.target.value)}/>
        </label></div>
        <span className='warning'>{error && error.userName}</span>
        <div><label>Password : <input type='password' className='inputBox' value={pass} onChange={e=> setPass(e.target.value)}/>
        </label></div>
        <span className='warning'>{error && error.pass}</span>
        <input type='submit' value="Register" className='regSub' onClick={handleSubmit}/>
       <span> Already have an account?<Link to='/Login'> Login</Link></span>
    </div>  
    </div>
  )
}

export default Register