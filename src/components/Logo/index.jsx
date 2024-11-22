import { Link } from "react-router-dom";
import image from "../../../public/logo4.jpeg";

const Logo = () => {
  return (
    <>
      <div className="flex justify-center">
        <Link to="/" className="text-white text-2xl font-bold">
          <img src={image} className="w-44" />
        </Link>
      </div>
    </>
  );
};

export default Logo;
