import { createSlice } from '@reduxjs/toolkit'

type LikedCardType = {
  id: string
  name: string
  image: string
}

const initialState = {
  user: JSON.parse(localStorage.getItem('currentUser') || 'null'),
}

const likedCardSlice = createSlice({
  name: 'likedCard',
  initialState,
  reducers: {
    addLikedCard: (state, action) => {
      state.user.likedCards.push(action.payload)
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const updatedUsers = users.map((u: any) =>
        u.email === state.user.email
          ? { ...u, likedCards: state.user.likedCards }
          : u
      )

      localStorage.setItem('users', JSON.stringify(updatedUsers))
      localStorage.setItem('currentUser', JSON.stringify(state.user))
      console.log(localStorage.getItem('users'))
    },
    unlikedCard: (state, action) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      state.user.likedCards = state.user.likedCards.filter(
        (card: LikedCardType) => card.id !== action.payload.id
      )
      const updatedUsers = users.map((u: any) =>
        u.email === state.user.email
          ? { ...u, likedCards: state.user.likedCards }
          : u
      )

      localStorage.setItem('users', JSON.stringify(updatedUsers))
      localStorage.setItem('currentUser', JSON.stringify(state.user))
    },
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { addLikedCard, unlikedCard, logout, login } =
  likedCardSlice.actions
export default likedCardSlice.reducer
