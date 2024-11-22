import NavBar from "../../components/NavBar";
import DataGridP from "../../components/DataGridP";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { siteName } from "../../components/Global";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const getFirstAndSecondNames = (fullName) => {
  const names = fullName.split(" ");
  return `${names[0]} ${names[1]}`;
};

const Home = () => {
  const name = "Home";
  const location = useLocation();

  useEffect(() => {
    const username = location.state?.name;
    const userType = location.state?.userType;

    localStorage.setItem("username", username);
    localStorage.setItem("usertype", userType);
  }, [location.state]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            {siteName} - {name}
          </title>
        </Helmet>
      </HelmetProvider>

      <NavBar />

      {location.state?.name && (
        <div className="flex justify-end px-4 py-2 font-sans font-bold">
          <p>{`Hi, ${getFirstAndSecondNames(location.state.name)}!`}</p>
        </div>
      )}

      <DataGridP />
    </>
  );
};

export default Home;
