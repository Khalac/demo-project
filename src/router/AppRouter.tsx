import {
  Home,
  CardsPage,
  SignupPage,
  LoginPage,
  SeriesPage,
  SetsPage,
  DetailSet,
  DetailCard,
  LikeCardsPage,
} from "@/pages";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedRoutes, AuthRoutes } from "@/utils/ProtectedRoutes";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/sets" element={<SetsPage />} />
          <Route path="/set/:id" element={<DetailSet />} />
          <Route path="/card/:id" element={<DetailCard />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/liked" element={<LikeCardsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
