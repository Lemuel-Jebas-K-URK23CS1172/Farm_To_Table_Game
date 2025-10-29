import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" replace />;

  if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/unauthorized" replace />;

  return children;
}
