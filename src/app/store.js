import { configureStore } from '@reduxjs/toolkit'
import reducerAuth from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: reducerAuth,
  },
})