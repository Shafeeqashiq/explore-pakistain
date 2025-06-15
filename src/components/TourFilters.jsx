import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const TourFilters = ({ filters, handleFilterChange, uniqueValues }) => (
  <Form className="mb-4 p-3 rounded bg-white shadow-sm">
    <Row className="gy-2 gx-3 align-items-end">
      <Col md={4}>
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search by destination, or keyword..."
        />
      </Col>
      <Col md={2}>
        <Form.Label>Location</Form.Label>
        <Form.Select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {uniqueValues("location").map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {uniqueValues("category").map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Label>Departure Location</Form.Label>
        <Form.Select
          name="departureLocation"
          value={filters.departureLocation}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {uniqueValues("departureLocation").map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Label>Duration</Form.Label>
        <Form.Select
          name="duration"
          value={filters.duration}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="1-3">1–3 Days</option>
          <option value="4-6">4–6 Days</option>
          <option value="7+">7+ Days</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
        />
      </Col>
      <Col md={2}>
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          value={filters.endDate}
          min={filters.startDate}
          onChange={handleFilterChange}
        />
      </Col>
      <Col md={2}>
        <Form.Label>Rating</Form.Label>
        <Form.Select
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="4.8">4.8+</option>
          <option value="4.5">4.5+</option>
          <option value="4.0">4.0+</option>
          <option value="3.5">3.5+</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Label>Min Price</Form.Label>
        <Form.Control
          type="number"
          name="minPrice"
          value={filters.minPrice}
          min={0}
          step={100}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            handleFilterChange({
              target: {
                name: "minPrice",
                value: isNaN(value) || value < 0 ? 0 : value,
              },
            });
          }}
        />
      </Col>

      <Col md={2}>
        <Form.Label>Max Price</Form.Label>
        <Form.Control
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          min={0}
          step={100}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            handleFilterChange({
              target: {
                name: "maxPrice",
                value: isNaN(value) || value < 0 ? 0 : value,
              },
            });
          }}
        />
      </Col>
    </Row>
  </Form>
);

export default TourFilters;
