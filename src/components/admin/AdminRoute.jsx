// src/utils/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminRoute;
