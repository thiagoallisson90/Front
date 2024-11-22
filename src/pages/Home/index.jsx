import NavBar from "../../components/NavBar";
import DataGridP from "../../components/DataGridP";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { siteName } from "../../components/Global";
import ButtonLogout from "../../components/ButtonLogout";
import NavItem from "../../components/NavItem";
import { useEffect, useState } from "react";

const Home = () => {
  const name = "Home";
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const getFirstAndSecondNames = () => {
      const names = username.split(" ");
      setUsername(`${names[0]} ${names[1]}`);
    };

    getFirstAndSecondNames();
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
        <NavItem navigateTo={"/teams"}>Teams</NavItem>
        <NavItem navigateTo={"/profile"}>Profile</NavItem>
        <li>
          <ButtonLogout />
        </li>
      </NavBar>

      {username && (
        <div className="flex justify-end px-4 py-2 font-sans font-bold">
          <p>{`Hi, ${username}!`}</p>
        </div>
      )}

      <DataGridP />
    </>
  );
};

export default Home;
