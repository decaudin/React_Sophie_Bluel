import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import { ProjectProvider } from "./components/ProjectContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(sessionStorage.getItem("token"))
  );

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <React.StrictMode>
      <Router>
        <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/Login"
            element={<Login isAuthenticated={isAuthenticated} />}
          />
        </Routes>
        <Footer />
      </Router>
    </React.StrictMode>
  );
};

root.render(
  <ProjectProvider>
    <App />
  </ProjectProvider>
);
