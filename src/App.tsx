import "./App.scss";
import HomePage from "@/pages/HomePage/HomePage";

import LoginPage from "@/pages/LoginPage/LoginPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
