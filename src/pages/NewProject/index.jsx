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

function validateCoord(coord) {
  const regex = /^\d+(\.\d+)?,\d+(\.\d+)?,\d+(\.\d+)?$/;
  return regex.test(coord);
}

const NewProject = () => {
  const name = "New Project";
  const [projectType, setProjectType] = useState("manual");
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      gatewayCount: "1",
      gatewayCoords: "",
      bandwidth: "868",
      frequency: "125",
      edCount: "1",
      edCoords: "",
      edClass: "A",
      opMode: "NACK",
      nackPerc: "100",
      ackPerc: "0",
      simArea: "",
      simTime: "",
      title: "",
      description: "",
      poissonApp: "",
      uniformApp: "",
      oneApp: "",
      registeredApps: "0",
      lossModel: "okumura",
      shadowingModel: "correlated",
    },
  });

  const gatewayCount = watch("gatewayCount");
  const edCount = watch("edCount");
  const opMode = watch("opMode");
  const nackPerc = watch("nackPerc");
  const ackPerc = watch("ackPerc");

  const handleNextStep = (data) => {
    const poissonApp = data["poissonApp"].split(",")[2];
    const uniformApp = data["uniformApp"].split(",")[2];
    const oneApp = data["uniformApp"].split(",")[2];

    if (step === 2) {
      console.log(poissonApp, uniformApp, oneApp);
    }
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
      /*data.gatewayCoords = data.gatewayCoords
        .split(";")
        .map((str) => str.trim())
        .join(";");

      data.edCoords = data.edCoords
        .split(";")
        .map((str) => str.trim())
        .join(";");
      console.log(data);*/
      console.log(data);
      await simulation(data);
    } else {
      console.log(errors);
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
        <NavItem navigateTo={"/profile"}>Profile</NavItem>
        <li>
          <ButtonLogout />
        </li>
      </NavBar>

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
              {["manual", "model"].map((type) => (
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
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">
                        {"Gateway's Coordinates (Format: x,y,z; x,y,z; ...)"}
                        <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          {...register("gatewayCoords", {
                            required: {
                              value: true,
                              message: "Fill in the gateway coordinates",
                            },
                            validate: (value) => {
                              const coords = value.split(";");

                              if (coords.length != gatewayCount) {
                                return `Please enter ${gatewayCount} coordinates!`;
                              }

                              for (const coord of coords) {
                                if (!validateCoord(coord.trim())) {
                                  return `Please enter valid coordinates`;
                                }
                              }

                              return true;
                            },
                          })}
                          placeholder="Enter coordinates (e.g., 1.2,3.4,5.6; 7.8,9.0,1.1)"
                          className="block w-full border border-inherit rounded-lg p-2"
                          rows={gatewayCount}
                        />
                        <span className="absolute text-xs text-gray-500 right-2 bottom-2">
                          x and y coordinates plus z (height)
                        </span>
                      </div>
                      {errors?.gatewayCoords && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.gatewayCoords.message}
                        </p>
                      )}
                    </div>
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
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">
                        {`ED's Coordinates (Format: x,y,z; x,y,z; ...)`}
                        <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          {...register("edCoords", {
                            required: {
                              value: true,
                              message: "Fill in the ED's coordinates",
                            },
                            validate: (value) => {
                              const coords = value.split(";");

                              if (coords.length != edCount) {
                                return `Please enter ${edCount} coordinates!`;
                              }

                              for (const coord of coords) {
                                if (!validateCoord(coord.trim())) {
                                  return `Please enter valid coordinates`;
                                }
                              }

                              return true;
                            },
                          })}
                          placeholder="Enter coordinates (e.g., 1.2,3.4,5.6; 7.8,9.0,1.1)"
                          className="block w-full border border-inherit rounded-lg p-2"
                          rows={edCount}
                        />
                        <span className="absolute text-xs text-gray-500 right-2 bottom-2">
                          x and y coordinates plus z (height)
                        </span>
                      </div>
                      {errors?.edCoords && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.edCoords.message}
                        </p>
                      )}
                    </div>
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
                      <span className="text-gray-700">NACK</span>
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
                      <span className="text-gray-700">ACK</span>
                    </label>

                    {/* Mixed */}
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="Mixed"
                        {...register("opMode", { required: true })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-gray-700">Mixed</span>
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

                  {/* Tx. Avg. Rate - Poisson */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Choose the types of application to be tested
                      <span className="text-red-600">*</span>
                    </label>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        {`Poisson Application (Format: Tx, Payload, % of EDs, and Delay)`}

                        <Tooltip
                          title="Provide the transmission average rate with the unit: e.g. 1pkt/s, 2pkt/min, or 4pkt/h. The payload size in bytes (B) with the unit: e.g. 20B. % of EDs: e.g. 30%. Allowed maximum delay with the unit: e.g. 1s, 1min, 1h, 1d."
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
                          name="poissonApp"
                          id="poissonApp"
                          placeholder="5pkt/h, 50B, 50%, 1min"
                          {...register("poissonApp")}
                          className="block w-full border rounded-lg p-2"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Tx. Avg. Rate - Uniform */}
                  <div className="mb-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        {`Uniform Application (Format: Tx, Payload, % of EDs, and Delay)`}

                        <Tooltip
                          title="Provide the transmission average rate with the unit: e.g. 1pkt/s, 2pkt/min, or 4pkt/h. The payload size in bytes (B) with the unit: e.g. 20B. % of EDs: e.g. 30%. Allowed maximum delay with the unit: e.g. 1s, 1min, 1h, 1d."
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
                          name="uniformApp"
                          id="uniformApp"
                          placeholder="5pkt/h, 50B, 40%, 1min"
                          {...register("uniformApp")}
                          className="block w-full border rounded-lg p-2"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Tx. Avg. Rate - One Shot */}
                  <div className="mb-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        {`One Shot Application (Format: Payload, % of EDs, and Delay)`}

                        <Tooltip
                          title="One Shot sends a single packet. The payload size in bytes (B) with the unit: e.g. 20B. % of EDs: e.g. 30%. Allowed maximum delay with the unit: e.g. 1s, 1min, 1h, 1d."
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
                          name="oneApp"
                          id="oneApp"
                          placeholder="5pkt/h, 50B, 10%, 1min"
                          {...register("oneApp")}
                          className="block w-full border rounded-lg p-2"
                        />
                      </label>
                    </div>
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
                    {`Simulation Area (Format: x-dimension (m or km) and y-dimension (m or km))`}
                    <span className="text-red-600">*</span>

                    <Tooltip
                      title="Provide the dimensions with the unit: e.g. 1000m, 1000m; or 2km, 2km."
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
                      name="simArea"
                      id="simArea"
                      placeholder="x-dimension, y-dimension (e.g. 1000m, 1000m; or 5km, 5km)"
                      {...register("simArea", {
                        required: {
                          value: true,
                          message: "Simulation Area is required!",
                        },
                      })}
                      className="block w-full border rounded-lg p-2"
                    />
                  </label>
                  {errors?.simArea && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.simArea?.message}
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
