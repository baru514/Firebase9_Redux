import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// components
import Navbar from './components/Navbar'
import { AUTH_READY } from './features/auth/authSlice'
import { auth } from './firebase/config'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectRoutes from './pages/ProtectRoutes'
import Signup from './pages/Signup'

function App() {

  const dispatch = useDispatch();
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, user=>{
      dispatch(AUTH_READY(user))
      unsub();
    })
  },[])

  const {user} = useSelector(state=>state.auth)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
            {!user && <Navigate to='/login'/>}
            {user && <Home />}
            </>
          } />
          <Route path="/login" element={
            <>
            {user && <Navigate to='/'/>}
            {!user && <Login />}
            </>
          } />
          <Route path="/signup" element={
            <>
            {user && <Navigate to='/'/>}
            {!user && <Signup />}
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App