import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import RecoverPass from "../pages/RecoverPass";

const MyRoutes = () => {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* RecoverPass */}
        <Route path="/recover" element={<RecoverPass />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
