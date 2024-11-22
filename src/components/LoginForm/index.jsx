import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const { register, handleSubmit, resetField } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const ok = location.state?.ok;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.state?.ok && !localStorage.getItem("alertShown")) {
      setOpen(true);
      localStorage.setItem("alertShown", true);
    }

    return () => {
      setOpen(false);
    };
  }, [location.state]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (dataForm) => {
    try {
      const response = await login(dataForm);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);

        const { name, userType } = data;

        resetField("email");
        resetField("password");

        navigate("/home", {
          state: {
            name,
            userType,
          },
        });
      }
    } catch (error) {
      if (import.meta.env.VITE_REACT_ENV == "development") {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" className="text-sm">
          {ok}
        </Alert>
      </Snackbar>

      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Login
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            id="loginForm"
            name="loginForm"
          >
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
