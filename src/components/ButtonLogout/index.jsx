import { useNavigate } from "react-router-dom";
import { closeAuth, getRefreshToken } from "../../routes/helpers";
import { logout } from "../../services/api";

const ButtonLogout = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    logout(getRefreshToken());
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
