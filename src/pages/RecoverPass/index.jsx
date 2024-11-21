import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import RecoverForm from "../../components/RecoverForm";
import Top from "../../components/Top";

const RecoverPass = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>OptimusLoRa - Recover</title>
        </Helmet>
      </HelmetProvider>

      <Layout>
        <Top />

        <RecoverForm />

        <Footer />
      </Layout>
    </>
  );
};

export default RecoverPass;
