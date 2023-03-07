import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {

  const {logout} = useAuth();
  const handleLogout = () => {
    logout()
  }
  const {user} = useSelector(state=>state.auth)

  return (
    <nav>
      <h1>My Reading List</h1>
      <ul>
        {user ? 
          <>
            <li>hey,{user.displayName}</li>
            <li><NavLink to="/">Home</NavLink></li>
            <li onClick={()=>handleLogout()}>Logout</li>
          </>  : 
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
          </>}
      </ul>
    </nav>
  )
}
