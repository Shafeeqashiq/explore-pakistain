import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Badge,
  Image,
  Spinner,
} from "react-bootstrap";
import "../styles/TourDetailModal.css"; // Assuming you have some styles for the modal
const TourDetailModal = ({ show, onHide, tour }) => {
  const [serviceImages, setServiceImages] = useState({});
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    if (show) {
      fetch("http://localhost:5000/serviceImages")
        .then((res) => res.json())
        .then((data) => {
          setServiceImages(data);
          setLoadingImages(false);
        })
        .catch((err) => {
          console.error("Failed to load service images", err);
          setServiceImages({});
          setLoadingImages(false);
        });
    }
  }, [show]);

  if (!tour) return null;

  const imageUrl =
    typeof tour.image === "string" && tour.image.trim()
      ? tour.image
      : "https://via.placeholder.com/600x400";

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{tour.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <Image src={imageUrl} alt={tour.title} fluid rounded />
          </Col>
          <Col md={6}>
            <p>
              <strong>Location:</strong> {tour.location}
            </p>
            <p>
              <strong>Price:</strong> ${tour.price}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              <Badge bg="info">{tour.category}</Badge>
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {tour.rating}
            </p>
            <p>
              <strong>Departure:</strong> {tour.departureLocation}
            </p>
            <p>
              <strong>Duration:</strong> {tour.durationDays} days
            </p>
            <p>
              <strong>Start Date:</strong> {tour.startDate || "N/A"}
            </p>
            <p>
              <strong>End Date:</strong> {tour.endDate || "N/A"}
            </p>
          </Col>
        </Row>

        <h5>Description</h5>
        <p>{tour.description}</p>

        {Array.isArray(tour.itinerary) && tour.itinerary.length > 0 && (
          <>
            <h5>Itinerary</h5>
            <ul className="list-unstyled">
              {tour.itinerary.map((item, idx) => (
                <li key={idx} className="itinerary-item">
                  <strong>
                    Day {item.day}: {item.title}
                  </strong>
                  <p className="mb-1">{item.description}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {Array.isArray(tour.services) && tour.services.length > 0 && (
          <>
            <h5>Services Included</h5>
            {loadingImages ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <Row className="justify-content-center">
                {tour.services.map((service, idx) => (
                  <Col key={idx} md={4} className=" align-items-left mb-4 ">
                    <div className="service-card">
                      <Image
                        src={
                          serviceImages[service] ||
                          "https://via.placeholder.com/100"
                        }
                        alt={service}
                        fluid
                        className="service-image"
                      />
                      <div className="service-label">{service}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TourDetailModal;
