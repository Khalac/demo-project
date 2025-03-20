import "./App.scss";
import HomePage from "@/pages/HomePage/HomePage";

import LoginPage from "@/pages/LoginPage/LoginPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import SignupPage from "./pages/SignupPage/SignupPage";
import SeriesPage from "./pages/SeriesPage/SeriesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/series" element={<SeriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
