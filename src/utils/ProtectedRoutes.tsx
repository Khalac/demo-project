import { Outlet, Navigate } from "react-router-dom";
import { IsLoginedContext } from "@/context/IsLogined";
import { useContext } from "react";

const ProtectedRoutes = () => {
  const { isLogin } = useContext(IsLoginedContext);
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
