import NavBar from "../../components/NavBar";
import DataGridP from "../../components/DataGridP";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { siteName } from "../../components/Global";
import ButtonLogout from "../../components/ButtonLogout";
import NavItem from "../../components/NavItem";
import Welcome from "../../components/Welcome/Index";
import { useEffect, useState } from "react";
import { getSims } from "../../services/api";
import { getEmail, getToken } from "../../routes/helpers";

const Home = () => {
  const name = "Home";
  const [sims, setSims] = useState([]);

  const processSims = async () => {
    const data = await getSims(getEmail(), getToken());

    if (data.ok && Array.isArray(data.message)) {
      setSims(data.message);
    } else {
      setSims([]);
    }

    /*if (!data.ok && data.message === "Unauthorized, token invalid!") {
      const refresh_token = getRefreshToken();
      const data = await refreshToken(refresh_token);
      if (data.ok) {
        registerTokens();
      }
    }*/
  };

  useEffect(() => {
    processSims();
  }, []);

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

      <Welcome />

      {sims.length > 0 && <DataGridP simulations={sims} />}
    </>
  );
};

export default Home;
