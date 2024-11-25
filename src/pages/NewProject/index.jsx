import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const NewProject = () => {
  const [step, setStep] = useState(1);
  const [gateways, setGateways] = useState([]);
  const [endDevices, setEndDevices] = useState([]);

  const {
    control,
    handleSubmit,
    watch,
    //setValue,
    //formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      gatewayMode: "manual",
      gatewayFile: null,
      gatewayCount: 0,
      gatewayHeight: 10,
      endDeviceMode: "manual",
      endDeviceFile: null,
      endDeviceCount: 0,
      endDeviceHeight: 2,
      frequency: 868,
      bandwidth: 125,
      power: 14,
      spreadingFactor: 7,
    },
  });

  const gatewayMode = watch("gatewayMode");
  const endDeviceMode = watch("endDeviceMode");

  const handleNextStep = async () => {
    const validFields =
      step === 1
        ? [
            "gatewayMode",
            gatewayMode === "manual" ? "gatewayFile" : "gatewayCount",
          ]
        : [
            "endDeviceMode",
            endDeviceMode === "manual" ? "endDeviceFile" : "endDeviceCount",
          ];
    const isValid = await trigger(validFields);
    if (isValid) setStep(step + 1);
  };

  const handleBackStep = () => setStep(step - 1);

  const handleFileUpload = (e, setter) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        setter(parsed);
      } catch {
        alert("Invalid file format. Please upload a valid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleGenerateCoordinates = (count, height) => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: height,
    }));
    return generated;
  };

  const onSubmit = (data) => {
    if (gatewayMode === "automatic") {
      setGateways(
        handleGenerateCoordinates(data.gatewayCount, data.gatewayHeight)
      );
    }
    if (endDeviceMode === "automatic") {
      setEndDevices(
        handleGenerateCoordinates(data.endDeviceCount, data.endDeviceHeight)
      );
    }
    alert("Project Registered Successfully!");
    console.log("Gateways:", gateways);
    console.log("End Devices:", endDevices);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-100 p-6"
    >
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Project Registration
        </h1>

        {/* Step Indicator */}
        <div className="flex justify-between mb-6">
          {[1, 2].map((num) => (
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

        {/* Step 1: Gateway Information */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              Step 1: Gateway Information
            </h3>

            {/* Mode Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mode</label>
              <Controller
                name="gatewayMode"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        {...field}
                        type="radio"
                        value="manual"
                        checked={field.value === "manual"}
                      />
                      <span>Manual</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        {...field}
                        type="radio"
                        value="automatic"
                        checked={field.value === "automatic"}
                      />
                      <span>Automatic</span>
                    </label>
                  </div>
                )}
              />
            </div>

            {/* Manual Mode */}
            {gatewayMode === "manual" && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Upload Gateway Data (JSON or CSV)
                </label>
                <input
                  type="file"
                  accept=".json, .csv"
                  onChange={(e) => handleFileUpload(e, setGateways)}
                  className="block w-full border rounded-lg p-2"
                />
              </div>
            )}

            {/* Automatic Mode */}
            {gatewayMode === "automatic" && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Number of Gateways
                  </label>
                  <Controller
                    name="gatewayCount"
                    control={control}
                    rules={{ required: "Please enter the number of gateways" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        min="1"
                        className="block w-full border rounded-lg p-2"
                      />
                    )}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Height of Gateways (z-axis)
                  </label>
                  <Controller
                    name="gatewayHeight"
                    control={control}
                    rules={{ required: "Please enter the height of gateways" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        min="1"
                        className="block w-full border rounded-lg p-2"
                      />
                    )}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: End Device Information */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              Step 2: End Device Information
            </h3>

            {/* Mode Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mode</label>
              <Controller
                name="endDeviceMode"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        {...field}
                        type="radio"
                        value="manual"
                        checked={field.value === "manual"}
                      />
                      <span>Manual</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        {...field}
                        type="radio"
                        value="automatic"
                        checked={field.value === "automatic"}
                      />
                      <span>Automatic</span>
                    </label>
                  </div>
                )}
              />
            </div>

            {/* Manual Mode */}
            {endDeviceMode === "manual" && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Upload End Device Data (JSON or CSV)
                </label>
                <input
                  type="file"
                  accept=".json, .csv"
                  onChange={(e) => handleFileUpload(e, setEndDevices)}
                  className="block w-full border rounded-lg p-2"
                />
              </div>
            )}

            {/* Automatic Mode */}
            {endDeviceMode === "automatic" && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Number of End Devices
                  </label>
                  <Controller
                    name="endDeviceCount"
                    control={control}
                    rules={{
                      required: "Please enter the number of end devices",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        min="1"
                        className="block w-full border rounded-lg p-2"
                      />
                    )}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Height of End Devices (z-axis)
                  </label>
                  <Controller
                    name="endDeviceHeight"
                    control={control}
                    rules={{
                      required: "Please enter the height of end devices",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        min="1"
                        className="block w-full border rounded-lg p-2"
                      />
                    )}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBackStep}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default NewProject;
