import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { siteName } from "../../components/Global";
import NavBar from "../../components/NavBar";
import NavItem from "../../components/NavItem";
import ButtonLogout from "../../components/ButtonLogout";
import { IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { createSim as simulation } from "../../services/api";
import Welcome from "../../components/Welcome/Index";
import { getEmail, getToken } from "../../routes/helpers";
import { useNavigate } from "react-router-dom";

{
  /*function validateCoord(coord) {
  const regex = /^\d+(\.\d+)?,\d+(\.\d+)?,\d+(\.\d+)?$/;
  return regex.test(coord);
}*/
}

const NewProject = () => {
  const name = "New Project";
  const [projectType, setProjectType] = useState("manual");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      gatewayCount: "1",
      bandwidth: "868",
      frequency: "125",
      edCount: "1",
      edClass: "A",
      opMode: "NACK",
      appType: "",
      appPayload: "50",
      nackPerc: "100",
      ackPerc: "0",
      radius: "",
      simTime: "",
      title: "",
      description: "",
      lossModel: "okumura",
      shadowingModel: "correlated",
    },
  });

  const opMode = watch("opMode");
  const nackPerc = watch("nackPerc");
  const ackPerc = watch("ackPerc");
  const appType = watch("appType");

  const handleNextStep = () => {
    /*const poissonApp = data["poissonApp"].split(",")[2];
    const uniformApp = data["uniformApp"].split(",")[2];
    const oneApp = data["oneApp"].split(",")[2];*/

    if (isValid && step < 3) {
      setStep(step + 1);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data) => {
    if (isValid) {
      data.radius = data.radius
        .split(",")
        .map((dim) => {
          const trimmed = dim.trim();
          if (trimmed.endsWith("km")) {
            return parseFloat(trimmed.replace(/km$/i, "")) * 1000; // km to meters
          } else if (trimmed.endsWith("m")) {
            return parseFloat(trimmed.replace(/m$/i, "")); // keep meters
          }
          return parseFloat(trimmed);
        })
        .join(", ");

      // Conversão de simTime para segundos
      if (data.simTime.endsWith("d")) {
        data.simTime = parseInt(data.simTime.replace("h", "")) * 3600 * 24; // Days for seconds
      } else if (data.simTime.endsWith("h")) {
        data.simTime = parseInt(data.simTime.replace("h", "")) * 3600; // Hours for seconds
      } else if (data.simTime.endsWith("min")) {
        data.simTime = parseInt(data.simTime.replace("min", "")) * 60; // Minutes for seconds
      } else if (data.simTime.endsWith("s")) {
        data.simTime = parseInt(data.simTime.replace("s", "")); // Seconds
      }

      const response = await simulation(getToken(), getEmail(), data);
      if (response.success) {
        navigate("/simulation", {
          state: {
            id: response.data,
            title: data.title,
            description: data.description,
          },
        });
      }
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            {siteName} - {name}
          </title>
        </Helmet>
      </HelmetProvider>

      <NavBar>
        <NavItem navigateTo={"/projects"}>Projects</NavItem>
        {/*<NavItem navigateTo={"/profile"}>Profile</NavItem>*/}
        <li>
          <ButtonLogout />
        </li>
      </NavBar>

      <Welcome />

      <form className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-blue-700 mb-6">
            Project Registration
          </h1>

          {/* Project Type Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Select Project Type
            </label>
            <div className="flex items-center space-x-4">
              {["manual"].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setProjectType(type)}
                  className={`px-4 py-2 rounded-lg ${
                    projectType === type
                      ? "bg-blue-700 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Manual Configuration */}
          {projectType === "manual" && (
            <>
              {/* Step Indicator */}
              <div className="flex justify-between mb-6">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`w-1/2 p-2 text-center font-semibold rounded-lg ${
                      step === num
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Step {num}
                  </div>
                ))}
              </div>

              {/* Step 1: Gateway's Configuration */}
              {step === 1 && (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-blue-700 mb-4">
                      {"Step 1: Gateway's Configuration"}
                    </h3>

                    {/* Number of Gateways */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Number of Gateways
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        name="gatewayCount"
                        id="gatewayCount"
                        className="block w-full border rounded-lg p-2"
                        type="number"
                        min="1"
                        {...register("gatewayCount", {
                          required: {
                            value: true,
                            message: "Enter a value greater than or equal to 1",
                          },
                          onChange: (e) => {
                            e.target.value =
                              parseInt(e.target.value) <= 0
                                ? 1
                                : e.target.value;
                          },
                        })}
                      />
                      {errors?.gatewayCount && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.gatewayCount.message}
                        </p>
                      )}
                    </div>

                    {/* Gateway Coordinates */}
                  </div>

                  {/* Bandwidth and Frequency */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Bandwidth
                      <span className="text-red-600">*</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="868"
                        {...register("bandwidth", {
                          required: {
                            value: true,
                            message: "Bandwidth is required!",
                          },
                        })}
                      />
                      <span>868 MHz</span>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Frequency
                      <span className="text-red-600">*</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="125"
                        {...register("frequency", {
                          required: {
                            value: true,
                            message: "Frequency is required!",
                          },
                        })}
                      />
                      <span>125 kHz</span>
                    </label>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handleSubmit(handleNextStep)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ml-auto"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: ED's Configuration */}
              {step === 2 && (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-blue-700 mb-4">
                      {`Step 2: ED's Configuration`}
                    </h3>

                    {/* Number of EDs */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Number of EDs
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        name="edCount"
                        id="edCount"
                        className="block w-full border rounded-lg p-2"
                        type="number"
                        min="1"
                        {...register("edCount", {
                          required: {
                            value: true,
                            message: "Enter a value greater than or equal to 1",
                          },
                          onChange: (e) => {
                            e.target.value =
                              parseInt(e.target.value) <= 0
                                ? 1
                                : e.target.value;
                          },
                        })}
                      />
                      {errors?.edCount && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.edCount?.message}
                        </p>
                      )}
                    </div>

                    {/* ED's Coordinates */}
                  </div>

                  {/* ED's Classes */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      {`ED's Classes`}
                      <span className="text-red-600">*</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="A"
                        {...register("edClass", {
                          required: {
                            value: true,
                            message: "Class is required!",
                          },
                        })}
                      />
                      <span>Class A</span>
                    </label>
                    {errors?.edClass && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.edClass?.message}
                      </p>
                    )}
                  </div>

                  {/* Operation Mode */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Operation Mode
                      <span className="text-red-600">*</span>
                    </label>

                    {/* NACK */}
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="NACK"
                        {...register("opMode", {
                          required: true,
                          onChange: (e) => {
                            if (e.target.value === "NACK") {
                              setValue("nackPerc", "100");
                              setValue("ackPerc", "0");
                            } else if (e.target.value === "ACK") {
                              setValue("nackPerc", "0");
                              setValue("ackPerc", "100");
                            }
                          },
                        })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-gray-700">
                        NACK (Negative Acknowledgement)
                      </span>
                    </label>

                    {/* ACK */}
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="ACK"
                        {...register("opMode", {
                          required: true,
                          onChange: (e) => {
                            if (e.target.value === "ACK") {
                              setValue("ackPerc", "100");
                              setValue("nackPerc", "0");
                            } else if (e.target.value === "NACK") {
                              setValue("ackPerc", "0");
                              setValue("nackPerc", "100");
                            }
                          },
                        })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-gray-700">
                        ACK (Acknowledgement)
                      </span>
                    </label>

                    {/* Mixed */}
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="Mixed"
                        {...register("opMode", { required: true })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-gray-700">
                        Mixed (NACK and ACK)
                      </span>
                    </label>
                  </div>

                  {opMode === "Mixed" && (
                    <>
                      <div className="mb-4">
                        <input
                          name="nackPerc"
                          id="nackPerc"
                          {...register("nackPerc", {
                            required: {
                              value: true,
                              message: "Choose a value for NACK Percentage!",
                            },
                            onChange: (e) => {
                              setValue(
                                "ackPerc",
                                (100 - parseInt(e.target.value)).toString()
                              );
                            },
                          })}
                          type="range"
                          step="1"
                          className="w-full"
                        />
                      </div>
                      <div className="text-right text-gray-700">
                        {nackPerc}% NACK, {ackPerc}% ACK
                      </div>

                      <input
                        type="hidden"
                        name="ackPerc"
                        id="ackPerc"
                        {...register("ackPerc")}
                      />
                    </>
                  )}

                  {/* Applications */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Choose the types of application: Poisson, OneShot or
                      Uniform
                      <span className="text-red-600">*</span>
                    </label>

                    <div className="mb-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="poisson"
                          {...register("appType", {
                            required: true,
                          })}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-gray-700">Poisson</span>
                      </label>

                      {/**/}

                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="one"
                          {...register("appType", {
                            required: true,
                          })}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-gray-700">
                          OneShot (Each app send only one message)
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="uniform"
                          {...register("appType", {
                            required: true,
                          })}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-gray-700">Uniform</span>
                      </label>
                    </div>
                  </div>

                  {/*appType != "" && (
                    <>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                          {`Payload Size`}

                          <Tooltip
                            title="Provide the the payload size of the packets in bytes (B) with the unit: e.g. 20."
                            placement="right"
                            arrow
                          >
                            <IconButton className="text-blue-500">
                              <HelpOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        </label>

                        <label className="flex items-center space-x-2">
                          <input
                            {...register("appPayload", {
                              required: {
                                value: true,
                                message:
                                  "Enter the payload size of the packets!",
                              },
                              onChange: (e) => {
                                e.target.value =
                                  parseInt(e.target.value) <= 0
                                    ? 1
                                    : e.target.value;
                              },
                            })}
                            type="hidden"
                            className="block w-full border rounded-lg p-2"
                            placeholder="50"
                            min="1"
                          />
                        </label>
                      </div>
                    </>
                  )*/}

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit(handleNextStep)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ml-auto"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-4">
                  Step 3: Operational Configuration
                </h3>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    {`Simulation radius (Format: dimension in meters os kilometers (m or km))`}
                    <span className="text-red-600">*</span>

                    <Tooltip
                      title="Provide the dimension with the unit: e.g. 1000m, or 1km."
                      placement="right"
                      arrow
                    >
                      <IconButton className="text-blue-500">
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="radius"
                      id="radius"
                      placeholder="Radius in m ok km (e.g. 1000m, or 1km)"
                      {...register("radius", {
                        required: {
                          value: true,
                          message: "Simulation radius is required!",
                        },
                        pattern: {
                          value: /^\d+(\.\d+)?(m|km)$/,
                          message:
                            "Invalid format! Use Xm, Xkm, and X is positive.",
                        },
                        validate: {
                          positiveNumbers: (value) => {
                            const matches = value.match(/^\d+(\.\d+)?(m|km)$/);

                            // Se não passar no regex, retorna uma mensagem de erro
                            if (!matches) {
                              return "Invalid format. The value should be in the format Xm or Xkm.";
                            }

                            const [fullMatch, _, unit] = matches; // Desestruturação para pegar apenas o número
                            const parsedNumber = parseFloat(fullMatch);

                            //console.log(parsedNumber, unit);

                            // Verifica se o número é positivo
                            if (parsedNumber > 0) {
                              return true; // Valor válido
                            } else {
                              return "Dimension must be greater than 0!"; // Se o número não for maior que 0
                            }
                          },
                        },
                      })}
                      className="block w-full border rounded-lg p-2"
                    />
                  </label>

                  {errors?.radius && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.radius?.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    {`Simulation Time (Format: time in s, min, h, or day (d))`}
                    <span className="text-red-600">*</span>

                    <Tooltip
                      title="Provide the time with the unit: e.g. 50s, or 60min; or 12h, or 1d."
                      placement="right"
                      arrow
                    >
                      <IconButton className="text-blue-500">
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="simTime"
                      id="simTime"
                      placeholder="time (e.g. 50s, 60min, 12h, or 1d)"
                      {...register("simTime", {
                        required: {
                          value: true,
                          message: "Simulation Time is required!",
                        },
                        pattern: {
                          value: /^\d+(s|min|h|d)$/,
                          message: "Invalid format! Use Xs, Xmin, Xh, or Xd",
                        },
                        validate: {
                          positiveNumber: (value) => {
                            const matches = value.match(/^(\d+)(s|min|h|d)$/);
                            if (!matches) return true; // Already handled by pattern validation
                            const [_, number] = matches;
                            return Number(number) > 0
                              ? true
                              : "Time must be greater than 0!";
                          },
                        },
                      })}
                      className="block w-full border rounded-lg p-2"
                    />
                  </label>
                  {errors?.simTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.simTime?.message}
                    </p>
                  )}
                </div>

                {/* Path Loss Model */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Path Loss Model
                    <span className="text-red-600">*</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="okumura"
                      name="lossModel"
                      id="okumura"
                      {...register("lossModel", {
                        required: {
                          value: true,
                          message: "Path loss model is required!",
                        },
                      })}
                    />
                    <span>Okumura-Hata</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="log"
                      name="lossModel"
                      id="log"
                      {...register("lossModel", {
                        required: {
                          value: true,
                          message: "Path loss model is required!",
                        },
                      })}
                    />
                    <span>LogDistance</span>
                  </label>
                </div>

                {/* Path Loss Model */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Path Loss Model
                    <span className="text-red-600">*</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="correlated"
                      name="shadowingModel"
                      id="shadowingModel"
                      {...register("shadowingModel", {
                        required: {
                          value: true,
                          message: "Shadowing model is required!",
                        },
                      })}
                    />
                    <span>Correlated-Shadowing</span>
                  </label>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    {`Title of Simulation Project`}
                    <span className="text-red-600">*</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Project title with up to 50 characters"
                      {...register("title", {
                        required: {
                          value: true,
                          message: "Title is required!",
                        },
                        minLength: {
                          value: 3,
                          message: "Title must have at least 3 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "Title must be up to 50 characters",
                        },
                        onChange: (e) => {
                          if (e.target.value.length > 50) {
                            setValue("title", e.target.value.substring(0, 50));
                          }
                        },
                      })}
                      className="block w-full border rounded-lg p-2"
                    />
                  </label>
                  {errors?.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title?.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    {`Description of Simulation Project`}
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Project description with up to 255 characters [Optional]"
                      {...register("description", {
                        minLength: {
                          value: 3,
                          message:
                            "Description must have at least 3 characters",
                        },
                        maxLength: {
                          value: 255,
                          message: "Description with up to 255 characters",
                        },
                        onChange: (e) => {
                          if (e.target.value.length > 255) {
                            setValue(
                              "description",
                              e.target.value.substring(0, 255)
                            );
                          }
                        },
                      })}
                      className="block w-full border rounded-lg p-2"
                    />
                  </label>
                  {errors?.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description?.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handleBackStep}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ml-auto"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default NewProject;
