import { Link } from "react-router-dom";

function Top() {
  return (
    <>
      {/* Barra Superior */}
      <header className="w-full bg-indigo-600 text-white py-3 text-center text-lg font-bold">
        <Link to="/">OptimusLoRa</Link>
      </header>
    </>
  );
}

export default Top;
