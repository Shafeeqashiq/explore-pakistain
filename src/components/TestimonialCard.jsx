import React from "react";
import { Card } from "react-bootstrap";

const TestimonialCard = ({ name, rating, review }) => {
  const stars = [...Array(5)].map((_, i) => (
    <span key={i} className="text-warning">
      {i < rating ? "★" : "☆"}
    </span>
  ));

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title className="text-success">{name}</Card.Title>
        <div className="mb-2">
          {stars} <small className="text-muted">({rating}/5)</small>
        </div>
        <Card.Text className="text-dark">{review}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TestimonialCard;
