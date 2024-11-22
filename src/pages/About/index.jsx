import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import Top from "../../components/Top";
import { siteName } from "../../components/Global";
import { useNavigate } from "react-router-dom";
import imageAbout from "../../imgs/about_img.jpg";

{
  /*src="https://pagedone.io/asset/uploads/1717751272.png"*/
}

const About = () => {
  const name = "About";
  const navigate = useNavigate();

  const onClickGetStarted = () => {
    navigate("/login");
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            {siteName} - {name}
          </title>
        </Helmet>
      </HelmetProvider>

      <Layout>
        <div className="flex justify-center">
          <Top />
        </div>

        <section className="py-24 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                  <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    OptimusLoRa is a tool that optimizes LoRaWAN communication
                    infrastructure
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    OptimusLoRa assists in determining the ideal number of
                    gateways and configuring parameters for end devices, such as
                    the Spreading Factor, to maximize network performance and
                    efficiency. By leveraging cutting-edge algorithms,
                    OptimusLoRa ensures robust connectivity, minimizes latency,
                    and reduces deployment costs, making it an essential
                    solution for IoT network planners and developers.
                  </p>
                </div>
                <button
                  onClick={() => onClickGetStarted()}
                  className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
                >
                  <span className="px-1.5 text-white text-sm font-medium leading-6">
                    Get Started
                  </span>
                </button>
              </div>
              <img
                className="lg:mx-0 mx-auto h-full rounded-3xl object-cover"
                src={imageAbout}
                alt="about Us image"
              />
            </div>
          </div>
        </section>

        <Footer />
      </Layout>
    </>
  );
};

export default About;
