import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import RecoverPass from "../../pages/RecoverPass";
import Home from "../../pages/Home";
import PageError from "../../pages/PageError";
import PublicRoute from "../PublicRoute";
import PrivateRoute from "../PrivateRoute";
import About from "../../pages/About";
import Projects from "../../pages/Projects";
import Profile from "../../pages/Profile";
import NewProject from "../../pages/NewProject";

const MyRoutes = () => {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* Public Pages */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/recover"
          element={
            <PublicRoute>
              <RecoverPass />
            </PublicRoute>
          }
        />

        {/* Private Pages */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects/new"
          element={
            <PrivateRoute>
              <NewProject />
            </PrivateRoute>
          }
        />

        {/* Other Routes */}
        <Route path="/about" element={<About />} />

        <Route path="*" element={<PageError />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
