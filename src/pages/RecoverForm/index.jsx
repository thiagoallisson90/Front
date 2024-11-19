const RecoverForm = () => {
  return (
    <>
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Recover your Password
          </h2>

          <form action="#" method="POST">
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Botão de Enviar */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default RecoverForm;
