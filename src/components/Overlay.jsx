function Overlay() {
  return (
    <div
      className="position-absolute top-0 start-0 w-100 h-100 text-white d-flex flex-column justify-content-center align-items-center text-center"
      style={{ background: "rgba(0, 0, 0, 0.4)" }}
    >
      <h1 className="fw-bold display-4">
        You weren’t born to just exist
        <br />—<br />
        <em>you were made to wander.</em>
      </h1>
      <p className="fs-4 fst-italic">
        Let your soul breathe where the mountains meet the clouds.
      </p>
      {/* <a href="#tours" className="btn btn-success  text-white rounded-pill">
        Explore Now →
      </a> */}
    </div>
  );
}

export default Overlay;
