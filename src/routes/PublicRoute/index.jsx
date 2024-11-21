import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../helpers";

const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/home" />;
};

export default PublicRoute;
