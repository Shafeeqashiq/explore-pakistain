import React, { Suspense, lazy } from "react";

const HeroCarousel = lazy(() => import("./HeroCarousel"));
const TourOffers = lazy(() => import("./TourOffers"));
const Testimonials = lazy(() => import("./Testimonials"));

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroCarousel />
      <TourOffers />
      <Testimonials />
    </Suspense>
  );
};
export default Home;
