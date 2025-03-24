import { configureStore } from '@reduxjs/toolkit'
import likedCardReducer from '../slice/likedCardSlice'
export const store = configureStore({
  reducer: { user: likedCardReducer },
})
