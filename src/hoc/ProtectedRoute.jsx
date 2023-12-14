import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  // outlet itu component bawaan react router dom, component default
  return <>{children || <Outlet />}</>;
};
export default ProtectedRoute;
