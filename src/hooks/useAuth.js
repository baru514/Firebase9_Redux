import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile } from "firebase/auth"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { LOGIN, LOGOUT } from "../features/auth/authSlice"
import { auth } from "../firebase/config"


export const useAuth = () => {
  
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const signup = async (email, password, displayName) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res)=>{
        updateProfile(auth.currentUser, {
          displayName,
        })
        dispatch(LOGIN(res.user));
      }).catch((err)=>{setError(err.message)});
  }

  const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res)=>{
        dispatch(LOGIN(res.user));
      }).catch((err)=>setError(err.message));
  }

  const logout = async () => {
    setError(null);
    signOut(auth)
      .then(()=>{
        dispatch(LOGOUT());
      })
        .catch((err)=>setError(err.message));
  }

  return {error, signup, logout, login}
}