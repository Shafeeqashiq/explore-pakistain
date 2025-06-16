import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Alert,
  Card,
  Spinner,
  Row,
  Col,
  Badge,
  Image,
  Container,
} from "react-bootstrap";
import "../styles/CheckBookingStatus.css";

export default function CheckBookingStatus() {
  const [formData, setFormData] = useState({ bookingId: "", userName: "" });
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [tour, setTour] = useState(null);
  const [error, setError] = useState("");
  const [serviceImages, setServiceImages] = useState({});

  // Load service images on component mount
  useEffect(() => {
    fetch("http://localhost:5001/serviceImages")
      .then((res) => res.json())
      .then((data) => setServiceImages(data))
      .catch((err) => console.error("Failed to load service images", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBooking(null);
    setTour(null);

    try {
      const res = await fetch(
        `http://localhost:5001/bookings/${formData.bookingId}`
      );
      if (!res.ok) throw new Error("Booking not found");
      const bookingData = await res.json();

      if (
        bookingData.userName.toLowerCase() !== formData.userName.toLowerCase()
      ) {
        throw new Error("Name does not match booking record.");
      }

      setBooking(bookingData);

      const tourRes = await fetch(
        `http://localhost:5001/tours/${bookingData.tourId}`
      );
      if (!tourRes.ok) throw new Error("Related tour not found");
      const tourData = await tourRes.json();

      setTour(tourData);
    } catch (err) {
      setError(err.message || "Failed to retrieve booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 mb-5" id="booking_status">
      <h2 className="text-center mb-4 section-title">
        Check Your <em className="text-success">Booking Status</em>
      </h2>

      <Card className="p-4 mb-4 custom-shadow">
        <Form onSubmit={handleSearch} className="force-left-label">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="bookingId">
                <Form.Label className="text-start">Booking ID</Form.Label>
                <Form.Control
                  name="bookingId"
                  value={formData.bookingId}
                  onChange={handleChange}
                  placeholder="Enter your booking ID"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="userName">
                <Form.Label className="text-start">Your Full Name</Form.Label>
                <Form.Control
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="success" disabled={loading}>
            {loading ? (
              <Spinner size="sm" animation="border" />
            ) : (
              "Check Status"
            )}
          </Button>
          <p className="mt-2 text-muted">
            Enter your booking ID and full name to check the status of your
            booking. If you have any issues, please{" "}
            <a href="#contact_us">contact our support team.</a>
          </p>
        </Form>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      {booking && tour && (
        <>
          {/* Booking Information */}
          <Card className="mb-4 custom-shadow">
            <Card.Header as="h5" className="bg-success text-white">
              Booking Details
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="d-flex mb-2">
                    <strong
                      className="me-2 text-muted"
                      style={{ width: "140px" }}
                    >
                      Name:
                    </strong>
                    <span>{booking.userName}</span>
                  </div>
                  <div className="d-flex mb-2">
                    <strong
                      className="me-2 text-muted"
                      style={{ width: "140px" }}
                    >
                      Email:
                    </strong>
                    <span>{booking.userEmail}</span>
                  </div>
                  <div className="d-flex mb-2">
                    <strong
                      className="me-2 text-muted"
                      style={{ width: "140px" }}
                    >
                      Phone:
                    </strong>
                    <span>{booking.phoneNumber}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex mb-2">
                    <strong
                      className="me-2 text-muted"
                      style={{ width: "140px" }}
                    >
                      Total Seats:
                    </strong>
                    <span>{booking.numberOfPeople}</span>
                  </div>
                  <div className="d-flex mb-2">
                    <strong
                      className="me-2 text-muted"
                      style={{ width: "140px" }}
                    >
                      Booking Date:
                    </strong>
                    <span>
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="d-flex mb-2">
                    <strong
                      className="me-2 text-muted"
                      style={{ width: "140px" }}
                    >
                      Message:
                    </strong>
                    <span>{booking.message || "—"}</span>
                  </div>
                  <div className="d-flex mb-2">
                    <strong
                      className="me-2 text-muted"
                      style={{ width: "140px" }}
                    >
                      Status:
                    </strong>
                    <Badge
                      bg={
                        booking.status === "confirmed"
                          ? "success"
                          : booking.status === "pending"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Tour Details */}
          <Card className="custom-shadow">
            <Card.Header as="h5" className="bg-success text-white">
              Tour Details
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={5}>
                  <Image
                    src={tour.image || "https://via.placeholder.com/500x300"}
                    alt={tour.title}
                    fluid
                    rounded
                    className="mb-3"
                  />
                </Col>
                <Col md={7} className="d-flex flex-column align-items-start">
                  <h4 className="text-success">{tour.title}</h4>
                  <p>
                    <strong>Category:</strong> {tour.category}
                  </p>
                  <p>
                    <strong>Location:</strong> {tour.location}
                  </p>
                  <p>
                    <strong>Departure From:</strong> {tour.departureLocation}
                  </p>
                  <p>
                    <strong>Price:</strong> ${tour.price}
                  </p>
                  <p>
                    <strong>Duration:</strong> {tour.durationDays} Days
                  </p>
                  <p>
                    <strong>Start Date:</strong> {tour.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {tour.endDate}
                  </p>
                  <p>
                    <strong>Description:</strong> {tour.description}
                  </p>
                </Col>
              </Row>

              {/* Services with images */}
              {tour.services?.length > 0 && (
                <div className="mt-4">
                  <h5>Included Services</h5>
                  <Row className="mt-2">
                    {tour.services.map((service, idx) => (
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
                </div>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}
