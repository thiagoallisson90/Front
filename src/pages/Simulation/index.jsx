import { Helmet, HelmetProvider } from "react-helmet-async";
import { siteName } from "../../components/Global";
import NavBar from "../../components/NavBar";
import NavItem from "../../components/NavItem";
import ButtonLogout from "../../components/ButtonLogout";
import Welcome from "../../components/Welcome/Index";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { runSim } from "../../services/api";
import { getToken } from "../../routes/helpers";

const Simulation = () => {
  const name = "Simulation";
  const location = useLocation();
  const [data, setData] = useState("");
  const [imgs, setImgs] = useState("");

  const { id, title, description } = location.state;

  useEffect(() => {
    //console.log(id || "Without id");

    const handleRunSim = async () => {
      const response = await runSim(getToken(), id);
      if (response.success) {
        setData(response.data[0]);
        setImgs(response.data[1]);
      }
    };

    handleRunSim();
  });

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
          </div>
        </div>

        {data && (
          <>
            <p>Oi</p>
          </>
        )}
      </main>
    </>
  );
};

export default Simulation;
