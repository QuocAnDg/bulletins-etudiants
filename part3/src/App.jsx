import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Inscriptions from "./components/Inscriptions";
import Cours from "./components/Cours";
import Notes from "./components/Notes";
import InscriptionDetail from "./components/InscriptionDetail";

function App() {
  return (
    <Router>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Navigation />

        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/inscriptions" element={<Inscriptions />} />
            <Route path="/inscriptions/:matricule" element={<InscriptionDetail/>} />
            <Route path="/" element={<Cours />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
