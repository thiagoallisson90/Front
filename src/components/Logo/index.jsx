import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <Link to="/" className="text-white text-2xl font-bold">
        <img src="../public/logo4.jpeg" className="w-44" />
      </Link>
    </>
  );
};

export default Logo;
