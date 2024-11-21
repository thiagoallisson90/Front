import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { auth } from "../../services/api";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm({
    criteriaMode: "all", // Permite múltiplos erros por campo
  });

  const onSubmit = async (dataForm) => {
    try {
      dataForm["userType"] = "1";

      const response = await auth(dataForm);
      if (response.ok) {
        resetField("name");
        resetField("email");
        resetField("password");
        resetField("confirmPassword");

        localStorage.removeItem("alertShown");

        navigate("/", {
          state: {
            ok: true,
          },
        });
      }
    } catch (error) {
      if (import.meta.env.VITE_REACT_ENV == "development") {
        console.error(error);
      }
    }
  };

  const validatePass = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!hasUpperCase) {
      return "Password must have at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must have at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must have at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must have at least one special character.";
    }

    return true; // Valid password
  };

  return (
    <>
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="full-name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="full-name"
                {...register("name", {
                  required: "Name is required.",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long.",
                  },
                  validate: {
                    hasSpace: (value) =>
                      value.includes(" ") ||
                      "Name must contain at least one space.",
                  },
                })}
                className="mt-1 p-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className="text-red-500 text-sm">{message}</p>
                )}
              />
            </div>

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
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format.",
                  },
                })}
                className="mt-1 p-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="text-red-500 text-sm">{message}</p>
                )}
              />
            </div>

            {/* Password */}
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
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long.",
                  },
                  validate: validatePass,
                })}
                className="mt-1 p-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="text-red-500 text-sm">{message}</p>
                )}
              />
            </div>

            {/* Confirm Pass */}
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                {...register("confirmPassword", {
                  required: "Please confirm your password.",
                  validate: (value, { password }) =>
                    value === password || "Passwords do not match.",
                })}
                className="mt-1 p-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                errors={errors}
                name="confirmPassword"
                render={({ message }) => (
                  <p className="text-red-500 text-sm">{message}</p>
                )}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default SignupForm;
