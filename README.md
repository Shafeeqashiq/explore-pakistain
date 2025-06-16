# 🌍 Explore Pakistan - Tour Booking Web App

A user-friendly React-based web application for exploring and booking tours across Pakistan. Users can view tour packages, check availability, book tours, and track their booking status. Admins can manage tours and bookings through a dedicated dashboard.

---

## 🚀 Features

### 🧭 For Users

- Browse beautiful Pakistan tour packages
- View detailed itinerary, services, and pricing
- Book tours with real-time seat availability
- Instant booking confirmation with Booking ID
- Check booking status by entering Booking ID and Name

### 🛠️ For Admins

- Add, update, and delete tour packages
- Manage bookings and seat availability
- View all booking data in table format

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router, React Bootstrap
- **Backend**: JSON Server (mock REST API)
- **Styling**: Bootstrap 5, Custom CSS
- **Deployment**: Runs locally (or can be hosted via Netlify/Vercel)

---

## 📁 Project Structure

```bash
src/
│
├── assets/
│   └── explore_pakistan_logo.png      # Static assets like logos
│
│   Admin/                   # Admin panel components
│      ├── AdminDashboard.jsx
│      ├── BookingManagement.jsx
│      ├── TourFormModal.jsx
│      ├── TourListTable.jsx
│      ├── TourManagement.jsx
├── components/                  # Reusable React components
│   ├── 
│   │
│   ├── Overlay.jsx              # General UI overlay
│   ├── ServiceItem.jsx          # Services items
│   ├── TestimonialCard.jsx      # Testimonials
│   ├── TourBookingForm.jsx      # Booking form component
│   ├── TourCards.jsx            # Tour listing card
│   ├── TourDetailModal.jsx      # Modal to view tour details
│   ├── TourFilters.jsx          # Filters for searching
│   ├── TourList.jsx             # List of all tours
│   ├── TourPagination.jsx       # Pagination control
│
├── pages/                       # Main route pages
│   ├── Admin.jsx                # Admin dashboard route
│   ├── CheckBookingStatus.jsx  # Page to check booking by ID + name
│   ├── Footer.jsx               # Footer
│   ├── HeroCarousel.jsx        # Homepage hero slider
│   ├── Home.jsx                # Homepage
│   ├── Navbar.jsx              # Navigation bar
│   ├── Testimonials.jsx        # Testimonials page
│   ├── TourOffers.jsx          # Public-facing tour listing
│
├── styles/
│   └── App.css                  # Global styles
│
├── App.js                      # Main App component
├── data.js                     # Optional local data for tours
├── index.css                   # Global CSS rules
├── index.js                    # Entry point for rendering
└── main.jsx                    # Optional Vite/alternative entry
```
