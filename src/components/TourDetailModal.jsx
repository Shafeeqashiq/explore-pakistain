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
import "../styles/TourDetailModal.css";
import TourBookingForm from "./TourBookingForm";

const TourDetailModal = ({ show, onHide, tour }) => {
  const [currentTour, setCurrentTour] = useState(null);
  const [serviceImages, setServiceImages] = useState({});
  const [loadingImages, setLoadingImages] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Update local tour state when new tour prop is passed
  useEffect(() => {
    if (tour) {
      setCurrentTour(tour);
    }
  }, [tour]);

  // Fetch service images when modal is shown
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

  if (!currentTour) return null;

  const imageUrl =
    typeof currentTour.image === "string" && currentTour.image.trim()
      ? currentTour.image
      : "https://via.placeholder.com/600x400";

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{currentTour.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <Image src={imageUrl} alt={currentTour.title} fluid rounded />
          </Col>
          <Col md={6}>
            <p>
              <strong>Location:</strong> {currentTour.location}
            </p>
            <p>
              <strong>Price:</strong> ${currentTour.price}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              <Badge bg="info">{currentTour.category}</Badge>
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {currentTour.rating}
            </p>
            <p>
              <strong>Departure:</strong> {currentTour.departureLocation}
            </p>
            <p>
              <strong>Duration:</strong> {currentTour.durationDays} days
            </p>
            <p>
              <strong>Seats Available:</strong> {currentTour.remainingSeats}{" "}
              seats
            </p>
            <p>
              <strong>Start Date:</strong> {currentTour.startDate || "N/A"}
            </p>
            <p>
              <strong>End Date:</strong> {currentTour.endDate || "N/A"}
            </p>
          </Col>
        </Row>

        <h5>Description</h5>
        <p>{currentTour.description}</p>

        {Array.isArray(currentTour.itinerary) &&
          currentTour.itinerary.length > 0 && (
            <>
              <h5>Itinerary</h5>
              <ul className="list-unstyled">
                {currentTour.itinerary.map((item, idx) => (
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

        {Array.isArray(currentTour.services) &&
          currentTour.services.length > 0 && (
            <>
              <h5>Services Included</h5>
              {loadingImages ? (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              ) : (
                <Row className="justify-content-center">
                  {currentTour.services.map((service, idx) => (
                    <Col key={idx} md={4} className="align mb-4">
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

        {showBookingForm && (
          <TourBookingForm
            tourId={currentTour.id}
            remainingSeats={currentTour.remainingSeats}
            updateRemainingSeats={(newSeats) => {
              setCurrentTour((prev) => ({
                ...prev,
                remainingSeats: newSeats,
              }));
            }}
            onSuccess={() => console.log("Booking complete!")}
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        {!showBookingForm ? (
          <Button variant="success" onClick={() => setShowBookingForm(true)}>
            Book Now
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => setShowBookingForm(false)}>
            Cancel Booking
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TourDetailModal;
