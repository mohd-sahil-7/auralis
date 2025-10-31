import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import{Link, replace} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Login() {
    const [errors,setError] = useState({})
    const[email ,setEmail] = useState('')
    const[pass ,setPass] = useState('')
    const nav = useNavigate()
    

        function handleLog(){
        let error= {}
         if(email.trim()==""){
             error.email = "! Email is required"
             setError(error)
            }
            if(! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
                error.email="! Invalid Email Format" 
                setError(error)
            }
            if(pass.trim()==""){
                error.pass = "! Password is required"
                setError(error)
            }
            if(Object.keys(error).length==0){
                axios.get(`https://auralis-2.onrender.com/users?email=${email}&pass=${pass}`).then((res) =>{
                    if(res.data.length===0){
                    setEmail("")
                    setPass("")
                    error.pass = "! Invalid login details, Try again"
                    setError(error)
                }
                else if(res.data[0].status === "blocked"){
                    setEmail("")
                    setPass("")
                    setError({})
                    toast("You are blocked",{icon:'⚠️'})
                }
                else{
                    setEmail("")
                    setPass("")
                    setError({})
                    toast.success("Login Success")
                    {res.data[0].role == "admin" ? nav('/Dashboard',{replace:true}) : nav('/home',{replace:true}) }
                    localStorage.setItem("user",JSON.stringify(res.data[0]))
                    localStorage.setItem("isLoggedIn","true")
                    
                }})
                
                
        }
    }
  return (
    <div className='logBody'>
        <div className="login">
            <h2>Login</h2>
            <div><label>Email ID :&nbsp;&nbsp; <input type='text' className='inputBox' value={email} 
            onChange={(e)=> setEmail(e.target.value)} /></label></div>
            <span className='warning'>{errors&&errors.email}</span>
            <div><label>Password : <input type='Password' className='inputBox' value={pass} 
            onChange={(e)=> setPass(e.target.value)}/></label></div>
            <span className='warning'>{errors&&errors.pass}</span>
            <input type="submit" value="Login" onClick={handleLog} className='logSub' />
            <span>Don't have an account?<Link to='/Register'> Create one</Link></span>
        </div>
    </div>
  )
}

export default Login