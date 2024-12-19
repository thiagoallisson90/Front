import { Helmet, HelmetProvider } from "react-helmet-async";
import { siteName } from "../../components/Global";
import NavBar from "../../components/NavBar";
import NavItem from "../../components/NavItem";
import ButtonLogout from "../../components/ButtonLogout";
import Welcome from "../../components/Welcome/Index";
import DataGridP from "../../components/DataGridP";
import { PieChart } from "@mui/x-charts";

const Projects = () => {
  const name = "Projects";

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            {siteName} - {name}
          </title>
        </Helmet>
      </HelmetProvider>

      <NavBar>
        <NavItem navigateTo={"/projects"}>Projects</NavItem>
        {/*<NavItem navigateTo={"/profile"}>Profile</NavItem>*/}
        <li>
          <ButtonLogout />
        </li>
      </NavBar>

      <Welcome />

      <main className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div className="col-span-2">
          <DataGridP />
        </div>

        <div className="p-4">
          <div className="container mx-auto px-4 mt-6">
            <div className="flex items-center flex-col space-x-4">
              <h2 className="text-xl font-bold justify-center">
                Summary of Projects
              </h2>
              <div className="my-4">
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: "Completed" },
                        { id: 1, value: 15, label: "In Progress" },
                        { id: 2, value: 20, label: "Pending" },
                        { id: 3, value: 20, label: "Fail" },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Projects;
