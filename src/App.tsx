import './App.scss'
import HomePage from '@/pages/HomePage/HomePage'

import LoginPage from '@/pages/LoginPage/LoginPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ProtectedRoutes, AuthRoutes } from './utils/ProtectedRoutes'
import SignupPage from './pages/SignupPage/SignupPage'
import SeriesPage from './pages/SeriesPage/SeriesPage'
import SetsPage from './pages/SetsPage/SetsPage'
import DetailSet from './pages/DetailSet/DetailSet'
import CardsPage from './pages/CardsPage/CardsPage'
import DetailCard from './pages/DetailCard/DetailCard'
import LikeCardsPage from './pages/LikedCardsPage/LikeCardsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/sets" element={<SetsPage />} />
          <Route path="/set/:id" element={<DetailSet />} />
          <Route path="/card/:id" element={<DetailCard />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/liked" element={<LikeCardsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
