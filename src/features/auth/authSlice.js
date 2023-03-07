import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../../firebase/config'

const initialState = {
  user: null,
  authReady: false
}

export const AUTH_READY = createAsyncThunk('auth/ready', 
  async(user)=>{
    return user;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
      state.authReady = true;
    },
    LOGOUT: (state) => {
      state.user = null;
      state.authReady = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AUTH_READY.fulfilled, (state, action)=>{
        state.user = action.payload;
        state.authReady = true;
      })
  }
})



export const { LOGIN, LOGOUT } = authSlice.actions;

export default authSlice.reducer;