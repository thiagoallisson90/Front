import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { login } from "../../services/api";

const LoginForm = () => {
  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = async (dataForm) => {
    try {
      const response = await login(dataForm);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);

        resetField("email");
        resetField("password");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email")}
              />
            </div>

            {/* Senha */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="********"
                required
                minLength={8}
                {...register("password")}
              />
            </div>

            {/* Botão de Enviar */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>

            <hr className="my-4 border-t border-gray-300" />

            <div className="mb-4 text-center text-sm">
              <Link
                to="/signup"
                className="underline text-blue-500 hover:text-blue-700"
              >
                {`Don't have an account yet? Sign up now!`}
              </Link>
            </div>

            <div className="mb-4 text-center text-sm">
              <Link
                to="/recover"
                className="underline text-blue-500 hover:text-blue-700"
              >
                {`Forgot the password?`}
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginForm;
