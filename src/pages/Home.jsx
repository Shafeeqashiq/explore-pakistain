import React, { Suspense, lazy } from "react";

const HeroCarousel = lazy(() => import("./HeroCarousel"));
const TourOffers = lazy(() => import("./TourOffers"));
const Testimonials = lazy(() => import("./Testimonials"));
const CheckBookingStatus = lazy(() => import("./CheckBookingStatus"));

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroCarousel />
      <TourOffers />
      <CheckBookingStatus />
      <Testimonials />
    </Suspense>
  );
};
export default Home;
