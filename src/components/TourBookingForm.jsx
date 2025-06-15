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
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (res.ok) {
        const updatedSeats = remainingSeats - booking.numberOfPeople;

        // Update the available seats in the backend
        await fetch(`http://localhost:5000/tours/${tourId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ remainingSeats: updatedSeats }),
        });

        // Update local UI state
        updateRemainingSeats(updatedSeats);
        setStatus("success");
        setSubmittedData({
          userName: formData.userName,
          tourId: tourId,
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
        position="top-center"
        style={{ zIndex: 2000, position: "fixed" }}
      >
        <Toast
          onClose={() => setStatus(null)}
          show={status === "success"}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Booking Confirmed</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => setStatus(null)}
            />
          </Toast.Header>
          <Toast.Body>
            <div className="text-start">
              <p className="mb-2">
                🎉 <strong>Booking Confirmed!</strong>
                <br />
                Thank you for choosing us! Your tour booking has been
                successfully submitted.
              </p>

              <ul className="mb-2 ps-3">
                {submittedData?.userName && (
                  <li>
                    <strong>Booked By:</strong> {submittedData.userName}
                  </li>
                )}
                {submittedData?.tourId && (
                  <li>
                    <strong>Tour Reference ID:</strong> {submittedData.tourId}
                  </li>
                )}
              </ul>

              <small className="text-muted">
                Please save this information. You can use the Tour ID to track
                or verify your booking later.
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
