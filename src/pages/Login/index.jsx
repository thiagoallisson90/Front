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
          <title>LittAMI - Login</title>
        </Helmet>
      </HelmetProvider>

      <Layout>
        <Top />

        <main className="flex-grow flex items-center justify-center">
          <LoginForm />
        </main>

        <Footer />
      </Layout>
    </>
  );
};

export default Login;
