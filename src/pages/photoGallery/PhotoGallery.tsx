import React from "react";
import "./PhotoGallery.scss";

export default function PhotoGallery() {
  return (
    <div className="photo-gallery-container">
      <div className="photo-gallery">
        <div className="column">
          <div className="photo-item">
            <img src="https://source.unsplash.com/VWcPlbHglYc" alt="" />
          </div>
          <div className="photo-item">
            <img src="https://source.unsplash.com/e6FMMambeO4" alt="" />
          </div>
          <div className="photo-item">
            <img src="https://source.unsplash.com/klCiPmzUw0Y" alt="" />
          </div>
        </div>
        <div className="column">
          <div className="photo-item">
            <img src="https://source.unsplash.com/O0N9MF--hK4" alt="" />
          </div>
          <div className="photo-item">
            <img src="https://source.unsplash.com/FV3GConVSss" alt="" />
          </div>
          <div className="photo-item">
            <img src="https://source.unsplash.com/0ESjL-Nw22Y" alt="" />
          </div>
          <div className="photo-item">
            <img src="https://source.unsplash.com/KTVn62x6fFw" alt="" />
          </div>
        </div>
        <div className="column">
          <div className="photo-item">
            <img src="https://source.unsplash.com/VSeVhmW4_JQ" alt="" />
          </div>
          <div className="photo-item">
            <img src="https://source.unsplash.com/07aFaTf24Kg" alt="" />
          </div>
          <div className="photo-item">
            <img src="https://source.unsplash.com/DqyYTM7pR2o" alt="" />
          </div>
          <div className="photo-item">
            <img src="https://source.unsplash.com/IdNOTjPeHrE" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
