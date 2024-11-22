import { useNavigate } from "react-router-dom";

const ButtonPage = ({ children, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(navigateTo)}
        className="bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-lg hover:bg-gray-400 transition"
      >
        {children}
      </button>
    </>
  );
};

export default ButtonPage;
