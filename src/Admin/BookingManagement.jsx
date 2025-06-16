import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Spinner,
  Container,
  Card,
  Badge,
  Alert,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";

// const statusColors = {
//   pending: "warning",
//   approved: "success",
//   deleted: "danger",
// };

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTourId, setSelectedTourId] = useState("all");
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/bookings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        const updatedData = data.map((b) => ({
          ...b,
          status: b.status || "pending", // default status if missing
        }));
        setBookings(updatedData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingStatusId(id);
    try {
      const bookingToUpdate = bookings.find((b) => b._id === id || b.id === id);
      if (!bookingToUpdate) throw new Error("Booking not found");

      const updatedBooking = { ...bookingToUpdate, status: newStatus };

      const res = await fetch(`http://localhost:5001/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBooking),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id || b.id === id ? { ...b, status: newStatus } : b
        )
      );

      setToast({
        show: true,
        message: `Booking status updated to "${newStatus}"`,
      });
    } catch (err) {
      alert("Error updating status: " + err.message);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const uniqueTourIds = [...new Set(bookings.map((b) => b.tourId))];

  const filteredBookings = bookings.filter((b) => {
    const matchesTour = selectedTourId === "all" || b.tourId === selectedTourId;

    const matchesSearch = [b.userName, b.userEmail, b.tourId, b.phoneNumber]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesTour && matchesSearch;
  });

  return (
    <Container className="mt-4">
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Card className="shadow-sm">
        <Card.Header>
          <Row className="gx-3 gy-2 justify-content-center">
            <Col md={12}>
              <h5 className="text-center mb-2">Booking Management</h5>
            </Col>
            <Col md={6}>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md="auto">
              <Form.Select
                size="sm"
                value={selectedTourId}
                onChange={(e) => setSelectedTourId(e.target.value)}
              >
                <option value="all">All Tours</option>
                {uniqueTourIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table responsive bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Tour ID</th>
                  <th>Booking Date</th>
                  <th>Start Date</th>
                  <th>People</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b, index) => {
                  const bookingId = b._id || b.id;
                  return (
                    <tr key={bookingId}>
                      <td>{index + 1}</td>
                      <td>
                        <Badge bg="secondary">{bookingId}</Badge>
                      </td>
                      <td>{b.userName}</td>
                      <td>{b.userEmail}</td>
                      <td>{b.phoneNumber}</td>
                      <td>
                        <Badge bg="info">{b.tourId}</Badge>
                      </td>
                      <td>
                        {b.bookingDate
                          ? new Date(b.bookingDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>{b.startDate || "N/A"}</td>
                      <td>{b.numberOfPeople}</td>
                      <td>{b.message}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {/* <Badge bg={statusColors[b.status] || "secondary"}>
                            {b.status}
                          </Badge> */}
                          {updatingStatusId === bookingId ? (
                            <Spinner size="md" animation="border" />
                          ) : (
                            <Form.Select
                              size="sm"
                              style={{ maxWidth: "140px" }}
                              value={b.status}
                              onChange={(e) =>
                                handleStatusChange(bookingId, e.target.value)
                              }
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="deleted">Deleted</option>
                            </Form.Select>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingManagement;
