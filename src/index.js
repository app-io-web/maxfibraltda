import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./Styles/index.css";
import Home from "./Pages/Home";
import LoadingScreen from "./Components/LoadingScreen";
import Cadastro from "./Pages/Cadastro";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return loading ? <LoadingScreen /> : <Home />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cadastro" element={<Cadastro />} />
        {/* Redireciona para home se a rota não existir */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export default Home;
