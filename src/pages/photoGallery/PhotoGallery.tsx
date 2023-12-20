import React from "react";
import "./PhotoGallery.scss";
import { getPhotosList } from "../../services/photoService";
import { useQuery } from "react-query";

export default function PhotoGallery() {
  const {
    isLoading: isPhotosLoading,
    error: isPhotoError,
    data: PhotoData,
  } = useQuery(["photoList"], getPhotosList);

  console.log(PhotoData);

  return (
    <div className="photo-gallery-container">
      {!isPhotosLoading ? (
        <ul className="photo-gallery-list">
          {PhotoData.photoset?.photo.map((photo: any, index: number) => (
            <li key={index} className="photo-item">
              <img
                src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.png`}
                alt={photo.id}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
