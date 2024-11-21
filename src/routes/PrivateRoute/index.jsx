import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../helpers";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
