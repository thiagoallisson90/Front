import { useState } from "react";
import { FaEye, FaPlus } from "react-icons/fa";
import ButtonPage from "../ButtonPage";
import { useNavigate } from "react-router-dom";

const DataGridP = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([
    { id: 1, name: "Project AMI 1", status: "Completed", duration: "2h 30m" },
    { id: 2, name: "Project AMI 2", status: "In Progress", duration: "1h 15m" },
    { id: 3, name: "Project Mobility", status: "Pending", duration: "N/A" },
    { id: 4, name: "Project Blockchain", status: "Failed", duration: "45m" },
    {
      id: 5,
      name: "Project Smart Traps",
      status: "Completed",
      duration: "3h 20m",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-blue-800";
      case "In Progress":
        return "text-orange-500";
      case "Pending":
        return "text-blue-500";
      case "Failed":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-4">
      <div className="container mx-auto px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">Projects</h2>
            <input
              type="text"
              placeholder="Search by Name or Status"
              className="border rounded-lg p-2 w-60"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/project/new")}
          >
            <FaPlus className="mr-2" /> Add
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-md text-center">
            <thead>
              <tr className="bg-slate-400 text-white font-semibold">
                <th className="p-4">Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Duration</th>
                <th className="p-4">View Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="p-4">{item.name}</td>
                  <td
                    className={`p-4 font-medium ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </td>
                  <td className="p-4">{item.duration}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => navigate(`/project/${item.id}`)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <ButtonPage navigateTo={"/page/2"}>Previous</ButtonPage>
          <ButtonPage navigateTo={"/page/1"}>Next</ButtonPage>
        </div>
      </div>
    </div>
  );
};

export default DataGridP;
