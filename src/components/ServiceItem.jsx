import React from "react";

export default function ServiceItem({ service, imageUrl }) {
  return (
    <div className="text-center" style={{ width: 200 }}>
      <div className="position-relative rounded overflow-hidden shadow-sm">
        <img
          src={imageUrl}
          alt={service}
          className="img-fluid"
          style={{ height: 200, objectFit: "cover", borderRadius: 12 }}
        />
        <div className="position-absolute bottom-0 w-100 text-white px-2 py-1 bg-dark bg-opacity-75 text-start">
          {service}
        </div>
      </div>
    </div>
  );
}
