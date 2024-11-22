import { useNavigate } from "react-router-dom";
import { closeAuth } from "../../routes/helpers";

const ButtonLogout = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
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
