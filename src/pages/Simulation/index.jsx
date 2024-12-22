import { Helmet, HelmetProvider } from "react-helmet-async";
import { siteName } from "../../components/Global";
import NavBar from "../../components/NavBar";
import ButtonLogout from "../../components/ButtonLogout";
import Welcome from "../../components/Welcome/Index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl, runSim } from "../../services/api";
import { getToken } from "../../routes/helpers";
import { FaPlus } from "react-icons/fa";

const Simulation = () => {
  const name = "Simulation";

  const location = useLocation();
  const navigate = useNavigate();

  //const [folder, setFolder] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { id, title, description } = location.state;

  useEffect(() => {
    const handleRunSim = () => {
      setLoading(true);
      runSim(getToken(), id).then((response) => {
        if (response.success) {
          const folder = response.data;

          setImages([
            `${baseUrl}/files/${folder}/imgs/pos.png`,
            `${baseUrl}/files/${folder}/imgs/delay.png`,
            `${baseUrl}/files/${folder}/imgs/ed_pdr.png`,
            `${baseUrl}/files/${folder}/imgs/energy.png`,
            `${baseUrl}/files/${folder}/imgs/gw_pdr.png`,
            `${baseUrl}/files/${folder}/imgs/rssi.png`,
            `${baseUrl}/files/${folder}/imgs/snr.png`,
          ]);

          setLoading(false);
        }
      });
    };

    handleRunSim();
  }, [id]);

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
        {/*<NavItem navigateTo={"/projects"}>Projects</NavItem>*/}
        {/*<NavItem navigateTo={"/profile"}>Profile</NavItem>*/}
        <li>
          <ButtonLogout />
        </li>
      </NavBar>

      <Welcome />

      <main className="flex-grow flex items-center justify-center py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">
                Simulation {title || ":-)"}
              </h1>
              <h2 className="text-lg text-gray-600">{description || ":-)"}</h2>
              <p className="text-sm text-blue-500 font-medium">
                Status: Simulating
              </p>
            </div>

            <button
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate("/projects/new")}
            >
              <FaPlus className="mr-2" /> Add
            </button>
          </div>
        </div>
      </main>

      <div className="flex justify-center items-center mt-4">
        <div className="text-center w-full max-w-4xl">
          {isLoading && images.length == 0 && (
            <div className="text-2xl font-semibold text-blue-500">
              Loading...
            </div> // Indicador de carregamento
          )}
          {images.length > 0 && (
            <div className="grid grid-cols-1 gap-2 mt-4 mb-6 sm:grid-cols-1 md:grid-cols-1">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Simulation;
