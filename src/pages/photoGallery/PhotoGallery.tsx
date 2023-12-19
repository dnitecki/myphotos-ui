import React, { useEffect } from "react";
import "./PhotoGallery.scss";
import { getPhotosList } from "../../services/photoService";

export default function PhotoGallery() {
  useEffect(() => {
    getPhotosList();
  });

  return (
    <div className="photo-gallery-container">
      <ul className="photo-gallery-list">
        <li className="photo-item">
          <img src="https://source.unsplash.com/VWcPlbHglYc" alt="" />
        </li>
        <li className="photo-item">
          <img src="https://source.unsplash.com/e6FMMambeO4" alt="" />
        </li>
        <li className="photo-item">
          <img src="https://source.unsplash.com/klCiPmzUw0Y" alt="" />
        </li>
        <li className="photo-item">
          <img src="https://source.unsplash.com/O0N9MF--hK4" alt="" />
        </li>
        <li className="photo-item">
          <img src="https://source.unsplash.com/FV3GConVSss" alt="" />
        </li>
        <li className="photo-item">
          <img src="https://source.unsplash.com/0ESjL-Nw22Y" alt="" />
        </li>
        <li className="photo-item">
          <img src="https://source.unsplash.com/KTVn62x6fFw" alt="" />
        </li>
        <li className="photo-item">
          <img src="https://source.unsplash.com/VSeVhmW4_JQ" alt="" />
        </li>
        <li className="photo-item">
          <img src="https://source.unsplash.com/07aFaTf24Kg" alt="" />
        </li>
        <li className="photo-item">
          <img src="https://source.unsplash.com/DqyYTM7pR2o" alt="" />
        </li>
        <li className="photo-item">
          <img src="https://source.unsplash.com/IdNOTjPeHrE" alt="" />
        </li>
      </ul>
    </div>
  );
}
