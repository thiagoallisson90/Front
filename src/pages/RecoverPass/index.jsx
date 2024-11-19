import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../Footer";
import Layout from "../Layout";
import RecoverForm from "../RecoverForm";
import Top from "../Top";

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
