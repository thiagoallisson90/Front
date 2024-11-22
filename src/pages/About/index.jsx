import { Helmet, HelmetProvider } from "react-helmet-async";
import NavBar from "../../components/NavBar";

const About = () => {
  const pageName = "About";

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>OptimusLoRa - {pageName}</title>
        </Helmet>
      </HelmetProvider>

      <NavBar />

      <main className="container mx-auto px-4">
        <h1 className="font-medium">{pageName}</h1>
      </main>
    </>
  );
};

export default About;
