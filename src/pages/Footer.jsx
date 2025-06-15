import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer
      id="contact_us"
      className="footer-section bg-dark text-light pt-5 pb-3"
    >
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5>Contact Us</h5>
            <p className="mb-1">
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p>
              <strong>Email:</strong> hello@reallygreatsite.com
            </p>
          </Col>

          <Col md={4} className="mb-4 ">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 mt-2 justify-content-center">
              <a
                href="https://wa.me/923286883494"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/767px-WhatsApp.svg.png"
                  alt="WhatsApp"
                  width="25"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-shafeeq-flutter/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1024px-LinkedIn_icon.svg.png"
                  alt="LinkedIn"
                  width="25"
                />
              </a>
              <a
                href="https://www.facebook.com/people/Muhammad-Shafeeq/pfbid0FquhTGZ9S3vbSoBeyGV9x4Ed3jpRb9zomocurn21hvorW7oexduBYWMH5TC5kTyNl"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                  alt="Facebook"
                  width="25"
                />
              </a>
            </div>
          </Col>

          <Col md={4} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#tours" className="text-light text-decoration-none">
                  Tours
                </a>
              </li>
               <li>
                <a href="#booking_status" className="text-light text-decoration-none">
                  Booking Status
                </a>
              </li>
              
              <li>
                <a href="#reviews" className="text-light text-decoration-none">
                  Reviews
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="border-secondary" />
        <Row>
          <Col className="text-center">
            <small>
              © {new Date().getFullYear()} Explore Pakistan. All rights
              reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
