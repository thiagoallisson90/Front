import SignupForm from "../../components/SignupForm";
import Top from "../../components/Top";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";

import { Helmet, HelmetProvider } from "react-helmet-async";

const Signup = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>OptimusLoRa - Sign up</title>
        </Helmet>
      </HelmetProvider>

      <Layout>
        <Top />

        <SignupForm />

        <Footer />
      </Layout>
    </>
  );
};

export default Signup;
