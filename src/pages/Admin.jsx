// src/pages/Admin.jsx
import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import TourManagement from "../Admin/TourManagement";
import BookingManagement from "../Admin/BookingManagement";

const Admin = () => {
  const [key, setKey] = useState("tours");

  return (
    <Container style={{ paddingTop: "100px" }}>
      <h1 className="mb-4">Admin Dashboard</h1>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="tours" title="Manage Tours">
          <TourManagement />
        </Tab>
        <Tab eventKey="bookings" title="Manage Bookings">
          <BookingManagement />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Admin;
