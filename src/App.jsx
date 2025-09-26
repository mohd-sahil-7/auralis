import React from 'react'
import Register from './Pages/Register.jsx'
import Banner from './Pages/Banner.jsx'
import Login from './Pages/Login.jsx'
import NavBar from './Components/NavBar.jsx'
import Shop from './Pages/Shop.jsx'
import ProductDetails from './Pages/productDetails/productDetails.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import {Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Checkout from './Pages/Checkout/Checkout.jsx'
import Invoice from './Pages/Checkout/Invoice.jsx'
import Wishlist from './Pages/Wishlist.jsx'
import Profile from './Pages/Profile.jsx'
import Dashboard from './Admin/Dashboard.jsx'
import Users from './Admin/Users.jsx'
import Products from './Admin/Products.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import {Toaster} from 'react-hot-toast'
function App() {
  const user =JSON.parse(localStorage.getItem("user"))
  const loc = useLocation()
  return (
    <>
    {(loc.pathname==='/Dashboard' || loc.pathname==='/Users' || loc.pathname==='/Products')? "" : <NavBar/>}
    <Routes>
    <Route path="/" element={
      (user? user.role==="admin"? <Navigate to="/Dashboard"/> : <Navigate to="/home"/> : <Navigate to="/home"/> )
    }></Route>
    <Route path="/home" element={<Banner/>}/>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/Shop" element={<Shop/>}/>
    <Route path="/Product/:id" element={<ProductDetails/>}/>
    <Route path="/Cart" element={<Cart/>}/>
    <Route path="/Checkout" element={<Checkout/>}/>
    <Route path="/Invoice" element={<Invoice/>}/>
    <Route path="/Wishlist" element={<Wishlist/>}/>
    <Route path="/Profile" element={
    <ProtectedRoute allowedRoles={["admin","user"]}>
        <Profile/>
    </ProtectedRoute>}/>
    
    <Route path="/Dashboard" element={
      <ProtectedRoute allowedRoles={["admin"]}>
      <Dashboard/>
      </ProtectedRoute>
      }/>
    <Route path="/Users" element={
      <ProtectedRoute allowedRoles={["admin"]}>
      <Users/>
      </ProtectedRoute>}/>
    <Route path="/Products" element={
      <ProtectedRoute allowedRoles={["admin"]}>
      <Products/>
      </ProtectedRoute>}/>
    </Routes>
    <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App