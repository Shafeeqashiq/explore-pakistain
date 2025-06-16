// src/components/admin/TourListTable.jsx
import React from "react";
import { Table, Button, Image, Badge, Stack } from "react-bootstrap";
import { PencilSquare, Trash3Fill } from "react-bootstrap-icons";

const TourListTable = ({ tours, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover className="align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Location</th>
            <th>Price</th>
            <th>Dates</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id}>
              <td>
                <Image
                  src={tour.image}
                  alt={tour.title}
                  width={80}
                  height={60}
                  rounded
                  style={{ objectFit: "cover" }}
                />
              </td>
              <td className="fw-semibold">{tour.title}</td>
              <td>{tour.location}</td>
              <td>
                <Badge bg="success" pill>
                  ${tour.price}
                </Badge>
              </td>
              <td>
                <div>
                  <Badge bg="info" className="me-1">
                    {tour.startDate}
                  </Badge>
                  <span>→</span>
                  <Badge bg="secondary" className="ms-1">
                    {tour.endDate}
                  </Badge>
                </div>
              </td>
              <td>
                <Badge bg={tour.remainingSeats === 0 ? "danger" : "primary"}>
                  {tour.remainingSeats}/{tour.totalSeats}
                </Badge>
              </td>
              <td>
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="justify-content-center"
                >
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => onEdit(tour)}
                  >
                    <PencilSquare className="me-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => onDelete(tour.id)}
                  >
                    <Trash3Fill className="me-1" />
                    Delete
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TourListTable;
