import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HealthDeclarationForm from "./components/HealthDeclarationForm";


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<HealthDeclarationForm />} />
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
  );
}

export default App;
