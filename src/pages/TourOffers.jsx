import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TourFilters from "../components/TourFilters";
import TourList from "../components/TourList";
import TourPagination from "../components/TourPagination";
import TourDetailModal from "../components/TourDetailModal";

export default function TourOffers() {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    rating: "",
    departureLocation: "",
    duration: "",
    startDate: "",
    endDate: "",
  });

  const toursPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:5000/tours")
      .then((res) => res.json())
      .then((data) => setTours(data))
      .catch((err) => console.error("Failed to fetch tours:", err));
  });

  const uniqueValues = (key) => [...new Set(tours.map((tour) => tour[key]))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate" || name === "endDate") {
      if (value && !isNaN(new Date(value))) {
        setFilters((prev) => {
          if (name === "endDate" && prev.startDate && value < prev.startDate)
            return prev;
          if (name === "startDate" && prev.endDate && value > prev.endDate)
            return { ...prev, endDate: "" };
          return { ...prev, [name]: value };
        });
      }
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      tour.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesLocation =
      !filters.location || tour.location === filters.location;
    const matchesCategory =
      !filters.category || tour.category === filters.category;
    const matchesRating =
      !filters.rating || tour.rating >= parseFloat(filters.rating);
    const matchesDeparture =
      !filters.departureLocation ||
      tour.departureLocation === filters.departureLocation;

    const matchesDuration =
      !filters.duration ||
      (filters.duration === "1-3" && tour.durationDays <= 3) ||
      (filters.duration === "4-6" &&
        tour.durationDays >= 4 &&
        tour.durationDays <= 6) ||
      (filters.duration === "7+" && tour.durationDays >= 7);

    const matchesDate = (() => {
      if (!filters.startDate && !filters.endDate) return true;

      const tourStart = new Date(tour.startDate);
      const tourEnd = new Date(tour.endDate);
      const filterStart = filters.startDate
        ? new Date(filters.startDate)
        : null;
      const filterEnd = filters.endDate ? new Date(filters.endDate) : null;

      if (filterStart) filterStart.setHours(0, 0, 0, 0);
      if (filterEnd) filterEnd.setHours(23, 59, 59, 999);

      if (filterStart && filterEnd) {
        return tourStart >= filterStart && tourEnd <= filterEnd;
      }
      if (filterStart) return tourStart >= filterStart;
      if (filterEnd) return tourEnd <= filterEnd;

      return true;
    })();

    const matchesPrice =
      (!filters.minPrice || tour.price >= parseFloat(filters.minPrice)) &&
      (!filters.maxPrice || tour.price <= parseFloat(filters.maxPrice));

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesRating &&
      matchesDeparture &&
      matchesDuration &&
      matchesDate &&
      matchesPrice
    );
  });

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const section = document.getElementById("tours");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-light py-5" id="tours">
      <Container>
        <h2 className="text-center mb-4 section-title">
          Explore our <em className="text-success">Tour Offers</em>
        </h2>

        {/* Filters */}
        <TourFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          uniqueValues={uniqueValues}
        />

        {/* Tour Cards */}
        <TourList tours={currentTours} onSelect={setSelectedTour} />

        {/* Pagination */}
        <TourPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>

      {/* Modal */}
      <TourDetailModal
        show={!!selectedTour}
        onHide={() => setSelectedTour(null)}
        tour={selectedTour}
      />
    </div>
  );
}
