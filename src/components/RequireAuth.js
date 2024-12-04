import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const userRoles = auth?.roles || [];

  console.log("Allowed Roles:", allowedRoles);
  console.log("User Roles:", auth?.roles);

  const hasAccess = userRoles.find((role) => allowedRoles.includes(role));
  console.log("Has Access:", hasAccess);

  return hasAccess ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
