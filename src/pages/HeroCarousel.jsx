import { useEffect, useRef } from "react";
import Overlay from "../components/Overlay.jsx";
import videoLinks from "../data.js";
import * as bootstrap from "bootstrap";
import "../App.css";

function HeroCarousel() {
  const videoRefs = useRef([]);

  useEffect(() => {
    const carousel = document.getElementById("videoCarousel");

    const handleSlide = () => {
      const items = carousel.querySelectorAll(".carousel-item");
      const activeIndex = Array.from(items).findIndex((item) =>
        item.classList.contains("active")
      );

      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        if (index === activeIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });

      const activeVideo = videoRefs.current[activeIndex];
      if (activeVideo) {
        activeVideo.onended = () => {
          const nextIndex = (activeIndex + 1) % videoRefs.current.length;
          const carouselInstance =
            bootstrap.Carousel.getOrCreateInstance(carousel);
          carouselInstance.to(nextIndex);
        };
      }
    };

    carousel.addEventListener("slid.bs.carousel", handleSlide);
    handleSlide();

    return () => {
      carousel.removeEventListener("slid.bs.carousel", handleSlide);
    };
  }, []);

  return (
    <div
      id="videoCarousel"
      className="carousel slide position-relative hero-carousel"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {videoLinks.map((video, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={index}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="d-block w-100"
              muted
              playsInline
              style={{ height: "100vh", objectFit: "cover" }}
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#videoCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#videoCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

      <Overlay />
    </div>
  );
}

export default HeroCarousel;
