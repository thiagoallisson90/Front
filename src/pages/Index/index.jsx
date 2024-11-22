import { Helmet, HelmetProvider } from "react-helmet-async";
import { siteName } from "../../components/Global";
import NavBar from "../../components/NavBar";
import NavItem from "../../components/NavItem";

const Index = () => {
  const name = "Index";
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
        <NavItem navigateTo={"/signup"}>Signup</NavItem>
        <NavItem navigateTo={"/login"}>Login</NavItem>
        <NavItem navigateTo={"/about"}>About</NavItem>
      </NavBar>
    </>
  );
};

export default Index;
