import { Helmet, HelmetProvider } from "react-helmet-async";
import LoginForm from "../../components/LoginForm";
import Layout from "../../components/Layout";
import Top from "../../components/Top";
import Footer from "../../components/Footer";

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
