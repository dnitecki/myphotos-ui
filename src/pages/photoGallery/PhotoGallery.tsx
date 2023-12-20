import React, { useRef } from "react";
import "./PhotoGallery.scss";
import { getPhotosList } from "../../services/photoService";
import { useQuery } from "react-query";

export default function PhotoGallery() {
  const { isLoading: isPhotosLoading, data: PhotoData } = useQuery(
    ["photoList"],
    getPhotosList
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  // const imagesLoaded = useOnLoadImages(wrapperRef);

  return (
    <div className="photo-gallery-container" ref={wrapperRef}>
      <header className="photo-gallery-header">
        <h1>Dom's Snaps</h1>
      </header>
      {!isPhotosLoading ? (
        <ul className="photo-gallery-list">
          {PhotoData.photoset?.photo.map((photo: any, index: number) => (
            <li key={index} className="photo-item">
              <img
                src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.png`}
                alt={photo.id}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="photo-gallery-background" />
      )}
    </div>
  );
}
