import { Link } from "react-router-dom";
import logo from "../../imgs/logo4.jpeg";

const Logo = () => {
  return (
    <>
      <Link to="/home" className="text-white text-2xl font-bold">
        <img src={logo} className="w-44" />
      </Link>
    </>
  );
};

export default Logo;
