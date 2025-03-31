import { configureStore } from "@reduxjs/toolkit";
import userLikedCardSliceReducer from "../likeCard/model/slice";
export const store = configureStore({
  reducer: { user: userLikedCardSliceReducer },
});
