// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Testimonials from "./pages/Testimonials";
import TourOffers from "./pages/TourOffers";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Always visible */}
        <Navbar />

        {/* Route-based page rendering */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TourOffers" element={<TourOffers />} />
          <Route path="/testimonials" element={<Testimonials />} />
          {/* Add more pages here */}
        </Routes>

        {/* Always visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
