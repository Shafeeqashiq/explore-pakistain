import React, { useState } from "react";
import { Form, Button, Alert, Toast, ToastContainer } from "react-bootstrap";

export default function TourBookingForm({
  tourId,
  remainingSeats,
  updateRemainingSeats,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    phoneNumber: "",
    cnicPassport: "",
    numberOfPeople: 1,
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!formData.userName.trim())
      newErrors.userName = "Full name is required.";

    if (!formData.userEmail.trim()) {
      newErrors.userEmail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
      newErrors.userEmail = "Invalid email format.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number.";
    }

    const num = parseInt(formData.numberOfPeople);
    if (!num || num < 1) {
      newErrors.numberOfPeople = "Must be at least 1 person.";
    } else if (num > remainingSeats) {
      newErrors.numberOfPeople = `Only ${remainingSeats} seat(s) available.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfPeople" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const booking = {
      ...formData,
      tourId,
      bookingDate: new Date().toISOString(),
      status: "pending",
    };

    try {
      const res = await fetch("http://localhost:5001/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (res.ok) {
        const createdBooking = await res.json(); // 👈 Get booking with `id` from server
        const updatedSeats = remainingSeats - booking.numberOfPeople;

        await fetch(`http://localhost:5001/tours/${tourId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ remainingSeats: updatedSeats }),
        });

        updateRemainingSeats(updatedSeats);
        setStatus("success");
        setSubmittedData({
          userName: createdBooking.userName,
          bookingId: createdBooking.id, // ✅ Show this in toast
        });

        setFormData({
          userName: "",
          userEmail: "",
          phoneNumber: "",
          cnicPassport: "",
          numberOfPeople: 1,
          message: "",
        });
        setErrors({});
        if (onSuccess) onSuccess();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setStatus("error");
    }
  };

  return (
    <>
      <h5 className="mt-4">Book Your Tour</h5>

      <ToastContainer
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2000,
        }}
      >
        <Toast
          onClose={() => setStatus(null)}
          show={status === "success"}
          autohide={false}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">🎉 Booking Confirmed</strong>
          </Toast.Header>
          <Toast.Body>
            <div className="text-start">
              <p className="mb-2">
                Thank you for booking your tour with{" "}
                <strong>Explore Pakistan</strong>! Your reservation has been
                successfully submitted.
              </p>

              <ul className="mb-3 ps-3">
                {submittedData?.userName && (
                  <li>
                    <strong>Name:</strong> {submittedData.userName}
                  </li>
                )}
                {submittedData?.bookingId && (
                  <li>
                    <strong>Booking ID:</strong> {submittedData.bookingId}
                  </li>
                )}
              </ul>

              <p className="mb-2">
                🔎 To check your booking status later, please keep both your{" "}
                <strong>Tour ID</strong> and <strong>Name</strong> safe.
              </p>

              <small className="text-muted">
                You can use these details on the Booking Status page to view
                your booking information at any time.
              </small>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {status === "error" && (
        <Alert variant="danger">Failed to submit booking.</Alert>
      )}
      {errors.numberOfPeople && (
        <Alert variant="warning">{errors.numberOfPeople}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            isInvalid={!!errors.userName}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.userName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            isInvalid={!!errors.userEmail}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.userEmail}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            isInvalid={!!errors.phoneNumber}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>CNIC / Passport (optional)</Form.Label>
          <Form.Control
            name="cnicPassport"
            value={formData.cnicPassport}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Number of People</Form.Label>
          <Form.Control
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            min="1"
            max={remainingSeats}
            isInvalid={!!errors.numberOfPeople}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.numberOfPeople}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Message (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">
          Submit Booking
        </Button>
      </Form>
    </>
  );
}
