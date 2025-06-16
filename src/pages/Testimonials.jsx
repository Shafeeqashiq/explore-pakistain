import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import TestimonialCard from "../components/TestimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:5001/testimonials");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        // Shuffle and pick 10 random
        const shuffled = data.sort(() => 0.5 - Math.random());
        const randomTen = shuffled.slice(0, 10);

        setTestimonials(randomTen);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return <div>Loading testimonials...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!testimonials.length) return <div>No testimonials available</div>;

  return (
    <section
      className="bg-light py-5"
      id="reviews"
      style={{
        backgroundSize: "cover",
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2021/08/02/20/54/nature-6517866_1280.jpg')",
      }}
    >
      <Container>
        <h2 className="text-center mb-4 section-title">
          What Our <em className="text-success">Clients Say</em>
        </h2>
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-2">
              <TestimonialCard {...item} />
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Testimonials;
