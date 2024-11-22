import { Link } from "react-router-dom";

const NavItem = ({ children, navigateTo }) => {
  return (
    <>
      <li>
        <Link
          to={navigateTo}
          className="text-gray-200 font-bold hover:text-white transition"
        >
          {children}
        </Link>
      </li>
    </>
  );
};

export default NavItem;
