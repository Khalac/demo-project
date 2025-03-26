import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "@/features/context/AuthContext";
import { useContext } from "react";

export const ProtectedRoutes = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export const AuthRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
