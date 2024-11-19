import { Helmet, HelmetProvider } from "react-helmet-async";
import LoginForm from "../LoginForm";
import Layout from "../Layout";
import Top from "../Top";
import Footer from "../Footer";

const Login = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>OptimusLoRa - Login</title>
        </Helmet>
      </HelmetProvider>

      <Layout>
        <Top />

        <LoginForm />

        <Footer />
      </Layout>
    </>
  );
};

export default Login;
