import React, { useState } from "react";

function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");

  const navItems = [
    { label: "Home", href: "#videoCarousel" },
    { label: "Tours", href: "#tours" },
    { label: "Booking Status", href: "#booking_status" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact Us", href: "#contact_us" },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{ backgroundColor: "#2e3a44" }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <img src={"/logo.png"} alt="Explore Pakistan Logo" height="50" />
          <span
            className="fw-bold fs-4 fst-italic"
            style={{ color: "#04a6bf" }}
          >
            Explore Pakistan
          </span>
        </a>

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
            {navItems.map(({ label, href }) => (
              <li className="nav-item" key={label}>
                <a
                  className="nav-link"
                  href={href}
                  style={{
                    color: activeItem === label ? "#04a6bf" : "#ffffff",
                    fontWeight: activeItem === label ? "bold" : "normal",
                  }}
                  onClick={() => setActiveItem(label)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
