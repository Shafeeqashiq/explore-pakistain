import React from "react";
import { Card, Button, Col, Badge } from "react-bootstrap";
import "../styles/TourCard.css";

const TourCard = ({ tour, onSelect }) => {
  const {
    title,
    image,
    location,
    durationDays,
    price,
    rating,
    reviewsCount,
    startDate,
    startDates,
    category,
    remainingSeats,
  } = tour;

  const formattedStartDate = startDate
    ? new Date(startDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : startDates && startDates.length > 0
    ? new Date(startDates[0]).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Col md={6} lg={4} className="mb-4" role="listitem">
      <Card className="h-100 shadow rounded-4 border-0 overflow-hidden position-relative card-hover card-animated">
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={image || "https://via.placeholder.com/300x200"}
            alt={title}
            style={{ height: "220px", objectFit: "cover" }}
          />
          {/* {category && (
            
          )} */}
        </div>

        <Card.Body className="d-flex flex-column px-2 pt-2 pb-2">
          <Card.Title className="h5 mb-2 text-dark">{title}</Card.Title>
          {category && (
            <div className="mb-2">
              <Badge className="bg-success fst-italic">{category}</Badge>
            </div>
          )}

          <div className="text-muted small d-flex align-items-center mb-2">
            📍 {location} • {durationDays} Days
          </div>

          {formattedStartDate && (
            <div className="text-muted small d-flex align-items-center mb-2">
              📅 <strong className="ms-1">Start: {formattedStartDate}</strong>
            </div>
          )}

          <div className="fw-semibold text-success d-flex align-items-center mb-2">
            💰 <span className="ms-1">${price}</span>{" "}
            <span className="ms-1 small">per person</span>
          </div>

          <div className="text-warning small d-flex align-items-center mb-2">
            ⭐ {rating}{" "}
            <span className="ms-1 text-muted">
              ({reviewsCount || 0} reviews)
            </span>
          </div>

          {remainingSeats !== undefined && (
            <div className="text-muted small d-flex align-items-center mb-3">
              🪑 {remainingSeats} seats left
            </div>
          )}

          <div className="mt-auto">
            <Button
              variant="success"
              className="w-100 rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2 py-2 px-3 fs-6 shadow-sm border-0 custom-tour-btn"
              onClick={() => onSelect(tour)}
              aria-label={`View details for ${title}`}
            >
              <i className="bi bi-eye-fill"></i> View Details
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TourCard;
