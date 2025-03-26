import { configureStore } from "@reduxjs/toolkit";
import userLikedCardSlice from "../slice/likedCardSlice";
export const store = configureStore({
  reducer: { user: userLikedCardSlice },
});
