import { Navigate } from "react-router-dom";

const OwnerProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "owner") {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default OwnerProtectedRoute;
