import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const ProfileRegistration = () => {
  const [step, setStep] = useState(1); // Controla a etapa atual
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      name: localStorage.getItem("username") || "",
      email: "",
      profile: "professional", // "student" ou "professional"
      password: "",
      experience: "0", // Define "1-5 anos" como selecionado por padrão
      application: [],
      otherApplication: "",
    },
  });

  const application = watch("application");

  const onSubmit = (data) => {
    console.log("Form Submitted: ", data);
    alert("Registration Completed!");
  };

  const nextStep = async () => {
    const isStepValid = await trigger(
      step === 1
        ? ["name", "email", "profile", "password"]
        : ["experience", "application", "otherApplication"]
    );
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div>
          <h3 className="text-xl font-bold text-blue-700 mb-4">
            Step 1: Personal Information
          </h3>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
                  message: "Name must contain at least two words",
                },
              }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className="border rounded-lg w-full p-2"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="email"
                    className="border rounded-lg w-full p-2"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Profile */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile</label>
            <Controller
              name="profile"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      {...field}
                      type="radio"
                      value="professional"
                      checked={field.value === "professional"}
                    />
                    <span>Professional</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      {...field}
                      type="radio"
                      value="student"
                      checked={field.value === "student"}
                    />
                    <span>Student</span>
                  </label>
                </div>
              )}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
                },
              }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="password"
                    className="border rounded-lg w-full p-2"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <h3 className="text-xl font-bold text-blue-700 mb-4">
            Step 2: LoRaWAN Experience
          </h3>

          {/* Years of Experience */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Years of Experience
            </label>
            <Controller
              name="experience"
              control={control}
              rules={{ required: "Please select your experience" }}
              render={({ field }) => (
                <div className="flex flex-wrap gap-4">
                  {["1-5", "6-10", "11-15", "16+"].map((range, index) => (
                    <label key={range} className="flex items-center space-x-2">
                      <input
                        {...field}
                        type="radio"
                        value={index} // Usando o texto do intervalo
                        checked={0 === index}
                      />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.experience && (
              <p className="text-red-500 text-sm">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* IoT Application Type */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              IoT Application Type
            </label>
            <Controller
              name="application"
              control={control}
              rules={{
                required: "Please select at least one application type",
              }}
              render={({ field }) => (
                <div className="flex flex-wrap gap-4">
                  {[
                    "Agriculture",
                    "Industrial",
                    "Wearable",
                    "Health",
                    "Traffic Control",
                    "Fleet Management",
                    "Smart Metering",
                    "Other",
                  ].map((app) => (
                    <label key={app} className="flex items-center space-x-2">
                      <input
                        {...field}
                        type="checkbox"
                        value={app}
                        checked={field.value.includes(app)}
                        onChange={() => {
                          const updatedApplications = field.value.includes(app)
                            ? field.value.filter((item) => item !== app)
                            : [...field.value, app];
                          setValue("application", updatedApplications);
                        }}
                      />
                      <span>{app}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.application && (
              <p className="text-red-500 text-sm">
                {errors.application.message}
              </p>
            )}
          </div>

          {/* Other Application */}
          {application.includes("Other") && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Specify Application
              </label>
              <Controller
                name="otherApplication"
                control={control}
                rules={{ required: "Please specify your application" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="border rounded-lg w-full p-2"
                    placeholder="Describe your application"
                  />
                )}
              />
              {errors.otherApplication && (
                <p className="text-red-500 text-sm">
                  {errors.otherApplication.message}
                </p>
              )}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-100 p-6"
    >
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Profile Registration
        </h1>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`w-1/2 p-2 rounded-lg text-center text-sm font-semibold ${
                step === s
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {`Step ${s}`}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
          )}
          {step < 2 && (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 ml-auto"
            >
              Next
            </button>
          )}
          {step === 2 && (
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 ml-auto"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProfileRegistration;
