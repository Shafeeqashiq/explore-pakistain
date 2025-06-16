// src/components/admin/TourManagement.jsx
import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import TourFormModal from "./TourFormModal";
import TourListTable from "./TourListTable";

const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  // At the top (after useState)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchTours = async () => {
    const res = await fetch("http://localhost:5001/tours");
    const data = await res.json();
    setTours(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5001/tours/${id}`, { method: "DELETE" });
    setTours(tours.filter((t) => t.id !== id));
  };

  const handleSave = async (tourData) => {
    const isEdit = Boolean(tourData.id);
    const url = isEdit
      ? `http://localhost:5001/tours/${tourData.id}`
      : "http://localhost:5001/tours";

    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tourData),
    });

    const updated = await res.json();
    if (isEdit) {
      setTours((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } else {
      setTours((prev) => [...prev, updated]);
    }

    setShowModal(false);
    setSelectedTour(null);
  };
  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || tour.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <div className="d-flex gap-2 flex-wrap">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {[...new Set(tours.map((t) => t.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={() => setShowModal(true)}>Add New Tour</Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <TourListTable
          tours={filteredTours}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showModal && (
        <TourFormModal
          show={showModal}
          onHide={() => {
            setShowModal(false);
            setSelectedTour(null);
          }}
          onSave={handleSave}
          initialData={selectedTour}
        />
      )}
    </div>
  );
};

export default TourManagement;
