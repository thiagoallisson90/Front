import NavBar from "../../components/NavBar";
import DataGridP from "../../components/DataGridP";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>OptimusLoRa - Home</title>
        </Helmet>
      </HelmetProvider>
      <NavBar />

      <DataGridP />
    </>
  );
};

export default Home;
