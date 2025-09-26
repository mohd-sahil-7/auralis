import React from 'react'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({children, allowedRoles}) {
    const storedUser =localStorage.getItem("user")
    const user = JSON.parse(storedUser);
    if(!user){
       return <Navigate to='/' replace/>
    }
     if(allowedRoles && !allowedRoles.includes(user.role)){
       return <Navigate to='/' replace/>
    }
    
  return children
}

export default ProtectedRoute