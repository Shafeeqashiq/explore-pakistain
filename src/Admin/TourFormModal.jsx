import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";

// Preset categories and services
const initialCategories = ["Adventure", "Historical", "Relaxation"];
const initialServices = [
  { name: "Hotel", image: "" },
  { name: "Transport", image: "" },
  { name: "Meals", image: "" },
];

const defaultForm = {
  id: "",
  title: "",
  location: "",
  departureLocation: "",
  description: "",
  price: 0,
  durationDays: 1,
  rating: 0,
  reviewsCount: 0,
  startDate: "",
  endDate: "",
  remainingSeats: 0,
  totalSeats: 0,
  category: "",
  image: "",
  services: [],
  itinerary: [],
};

const TourFormModal = ({ show, onHide, onSave, initialData }) => {
  const [formData, setFormData] = useState(defaultForm);
  const [categories, setCategories] = useState(initialCategories);
  const [servicesList, setServicesList] = useState(initialServices);
  const [newCategory, setNewCategory] = useState("");
  const [newService, setNewService] = useState({ name: "", image: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData(initialData || defaultForm);
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (type, index, field, value) => {
    const copy = [...formData[type]];
    copy[index][field] = value;
    setFormData((prev) => ({ ...prev, [type]: copy }));
  };

  const addItinerary = () =>
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: prev.itinerary.length + 1, title: "", description: "" },
      ],
    }));

  const addService = () => {
    if (!newService.name || !newService.image) {
      return setError("Please provide both service name and image URL.");
    }

    const updatedServices = [...servicesList, newService];
    setServicesList(updatedServices);
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, newService.name],
    }));
    setNewService({ name: "", image: "" });
    setError("");
  };

  const addCategory = () => {
    if (!newCategory.trim()) return;
    if (!categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
    }
    setFormData((prev) => ({ ...prev, category: newCategory }));
    setNewCategory("");
  };

  const validateForm = () => {
    const {
      title,
      location,
      departureLocation,
      description,
      price,
      startDate,
      endDate,
      remainingSeats,
      totalSeats,
      category,
      services,
    } = formData;

    if (
      !title ||
      !location ||
      !departureLocation ||
      !description ||
      !price ||
      !startDate ||
      !endDate ||
      !category ||
      services.length === 0
    ) {
      return "Please fill in all required fields.";
    }

    if (new Date(startDate) > new Date(endDate)) {
      return "Start date cannot be after end date.";
    }

    if (remainingSeats > totalSeats) {
      return "Remaining seats cannot be greater than total seats.";
    }

    return "";
  };

  const handleSave = () => {
    const validationMsg = validateForm();
    if (validationMsg) {
      setError(validationMsg);
      return;
    }

    setError("");
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? "Edit" : "Add"} Tour</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Title</Form.Label>
                <Form.Control
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Location</Form.Label>
                <Form.Control
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Departure Location</Form.Label>
                <Form.Control
                  value={formData.departureLocation}
                  onChange={(e) =>
                    handleChange("departureLocation", e.target.value)
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Image URL</Form.Label>
                <Form.Control
                  value={formData.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Start / End Date</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        handleChange("startDate", e.target.value)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleChange("endDate", e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Price</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    handleChange("price", Number(e.target.value))
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Total Seats</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.totalSeats}
                  onChange={(e) =>
                    handleChange("totalSeats", Number(e.target.value))
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Remaining Seats</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.remainingSeats}
                  onChange={(e) =>
                    handleChange("remainingSeats", Number(e.target.value))
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Category</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                >
                  <option value="">Select category</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
                <InputGroup className="mt-1">
                  <Form.Control
                    placeholder="Add new category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button size="sm" onClick={addCategory}>
                    Add
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Services</Form.Label>
            {formData.services.map((s, i) => (
              <InputGroup className="mb-2" key={i}>
                <Form.Select
                  value={s}
                  onChange={(e) => {
                    const updated = [...formData.services];
                    updated[i] = e.target.value;
                    handleChange("services", updated);
                  }}
                >
                  <option value="">Select service</option>
                  {servicesList.map((s, idx) => (
                    <option key={idx} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    const updated = formData.services.filter(
                      (_, idx) => idx !== i
                    );
                    handleChange("services", updated);
                  }}
                >
                  &times;
                </Button>
              </InputGroup>
            ))}

            <Row className="align-items-end mb-2">
              <Col>
                <Form.Control
                  placeholder="New service name"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Service image URL"
                  value={newService.image}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                />
              </Col>
              <Col xs="auto">
                <Button size="sm" onClick={addService}>
                  + Add
                </Button>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Itinerary</Form.Label>
            {formData.itinerary.map((item, index) => (
              <div key={index} className="mb-3">
                <strong>Day {item.day}</strong>
                <Form.Control
                  className="mb-2"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) =>
                    handleArrayChange(
                      "itinerary",
                      index,
                      "title",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleArrayChange(
                      "itinerary",
                      index,
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}

            <div className="mt-4">
              <Button size="sm" onClick={addItinerary}>
                + Add Itinerary Day
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TourFormModal;
