import Logo from "../Logo";

function Top() {
  return (
    <>
      {/* Barra Superior */}
      <header className="w-full bg-indigo-600 text-white py-3 text-center text-lg font-bold">
        <Logo />
      </header>
    </>
  );
}

export default Top;
