import Logo from "../Logo";

function Top() {
  return (
    <>
      {/* Barra Superior */}
      <header className="w-full bg-indigo-600 text-white py-3 text-lg font-bold">
        <div className="flex justify-center">
          <Logo />
        </div>
      </header>
    </>
  );
}

export default Top;
