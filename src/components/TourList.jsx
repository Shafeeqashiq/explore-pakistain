import React from "react";
import TourCard from "./TourCard";
import { Row } from "react-bootstrap";

const TourList = ({ tours, onSelect }) => {
  return (
    <Row className="gy-4">
      {tours.length > 0 ? (
        tours.map((tour) => (
          <TourCard
            key={tour.id || tour.title}
            tour={tour}
            onSelect={onSelect}
          />
        ))
      ) : (
        <p className="text-center text-muted fs-5 my-4">
          <i className="bi bi-emoji-frown me-2 text-warning"></i>
          Sorry, no tours are currently available.
        </p>
      )}
    </Row>
  );
};

export default TourList;
