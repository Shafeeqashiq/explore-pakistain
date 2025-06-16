import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Testimonials from "./pages/Testimonials";
import TourOffers from "./pages/TourOffers";
import Admin from "./pages/Admin";
import CheckBookingStatus from "./pages/CheckBookingStatus";
import BookingStatus from "./pages/CheckBookingStatus";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TourOffers" element={<TourOffers />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking_status" element={<CheckBookingStatus />} />
          {/* <Route path="/contact_us" element={<Footer />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
