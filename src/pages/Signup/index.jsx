import SignupForm from "../SignupForm";
import Top from "../Top";
import Footer from "../Footer";
import Layout from "../Layout";

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

        <main className="flex-grow flex items-center justify-center">
          <SignupForm />
        </main>

        <Footer />
      </Layout>
    </>
  );
};

export default Signup;
