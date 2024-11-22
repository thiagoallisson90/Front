import { isAuthenticated } from "../helpers";
import Login from "../../pages/Login";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Login />;
};

export default PrivateRoute;
