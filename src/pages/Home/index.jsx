import NavBar from "../../components/NavBar";
import DataGridP from "../../components/DataGridP";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { siteName } from "../../components/Global";
import ButtonLogout from "../../components/ButtonLogout";
import NavItem from "../../components/NavItem";
import Welcome from "../../components/Welcome/Index";

const Home = () => {
  const name = "Home";

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

      <Welcome />

      <DataGridP />
    </>
  );
};

export default Home;
