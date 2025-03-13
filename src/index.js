import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Usa HashRouter
import "./Styles/index.css";
import Home from "./Pages/Home";
import LoadingScreen from "./Components/LoadingScreen"; // Certifique-se do caminho correto

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000); // Simula o tempo de carregamento
  }, []);

  return loading ? <LoadingScreen /> : <Home />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export default Home;
