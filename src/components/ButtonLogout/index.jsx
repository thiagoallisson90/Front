import { useNavigate } from "react-router-dom";
import { closeAuth, getEmail, getToken } from "../../routes/helpers";
import { logout } from "../../services/api";

const ButtonLogout = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    logout(getToken(), getEmail());
    closeAuth();
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={() => onClickLogout()}
        className="block text-gray-200 font-bold hover:text-white transition"
      >
        Logout
      </button>
    </>
  );
};

export default ButtonLogout;
