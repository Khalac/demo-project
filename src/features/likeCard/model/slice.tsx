import { createSlice } from "@reduxjs/toolkit";
import { LikedCardType } from "@/features/likeCard";
const initialState = {
  user: JSON.parse(localStorage.getItem("currentUser") || "null"),
};

const userLikedCardSlice = createSlice({
  name: "likedCard",
  initialState,
  reducers: {
    addLikedCard: (state, action) => {
      state.user.likedCards.push(action.payload);
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: any) =>
        u.email === state.user.email
          ? { ...u, likedCards: state.user.likedCards }
          : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },
    unlikedCard: (state, action) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      state.user.likedCards = state.user.likedCards.filter(
        (card: LikedCardType) => card.id !== action.payload.id
      );
      const updatedUsers = users.map((u: any) =>
        u.email === state.user.email
          ? { ...u, likedCards: state.user.likedCards }
          : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

export const { addLikedCard, unlikedCard, logoutAction, loginAction } =
  userLikedCardSlice.actions;
export default userLikedCardSlice.reducer;
