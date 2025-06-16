import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActiveItem("Home");
    else if (path === "/TourOffers") setActiveItem("Tours");
    else if (path === "/testimonials") setActiveItem("Reviews");
    else if (path === "/admin") setActiveItem("Admin");
    else setActiveItem("");
  }, [location]);

  const navItems = [
    { label: "Home", to: "/", scrollTo: "videoCarousel" },
    { label: "Tours", to: "/TourOffers", scrollTo: "tours" },
    {
      label: "Booking Status",
      to: "/",
      scrollTo: "booking_status",
      homeOnly: true,
    },
    { label: "Reviews", to: "/", scrollTo: "reviews", homeOnly: true },
    { label: "Contact Us", to: "/", scrollTo: "contact_us", homeOnly: true },
    { label: "", to: "/admin" },
  ];

  const handleClick = (label, to, scrollTo) => {
    setActiveItem(label);

    // Scroll within same page
    if (location.pathname === "/" && scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Navigate and scroll after delay
    else if (scrollTo) {
      navigate(to, { state: { scrollTo } });
    }

    // Navigate without scrolling
    else if (to) {
      navigate(to);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{ backgroundColor: "#2e3a44" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src="/logo.png" alt="Explore Pakistan Logo" height="50" />
          <span
            className="fw-bold fs-4 fst-italic"
            style={{ color: "#04a6bf" }}
          >
            Explore Pakistan
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map(({ label, to, scrollTo, homeOnly }) => {
              const isActive = activeItem === label;
              return (
                <li className="nav-item" key={label}>
                  <span
                    role="button"
                    className="nav-link"
                    style={{
                      cursor: "pointer",
                      color: isActive ? "#04a6bf" : "#ffffff",
                      fontWeight: isActive ? "bold" : "normal",
                    }}
                    onClick={() => handleClick(label, to, scrollTo, homeOnly)}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
