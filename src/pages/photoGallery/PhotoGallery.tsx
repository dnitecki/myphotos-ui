import React, { useState } from "react";
import "./PhotoGallery.scss";
import { getPhotosList } from "../../services/photoService";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faFlickr } from "@fortawesome/free-brands-svg-icons/faFlickr";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons/faShareNodes";
import myLogo from "../../assets/MyLogo.png";

export default function PhotoGallery() {
  const [clicked, setClicked] = useState(false);
  const [image, setImage] = useState(null);

  const { isLoading: isPhotosLoading, data: PhotoData } = useQuery(
    ["photoList"],
    getPhotosList
  );

  const resetClick = () => {
    setClicked(!clicked);
  };

  const imageClickHandler = (
    farm: string,
    server: string,
    id: string,
    secret: any
  ) => {
    const image: JSX.Element = (
      <img
        src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.png`}
        alt={id}
      />
    );
    setClicked(!clicked);
    setImage(image);
  };

  const photoGallery = (
    <div
      className={
        clicked ? "photo-gallery-parallax-hidden" : "photo-gallery-parallax"
      }
    >
      <header className="photo-gallery-header">
        <div className="header-text">
          <h1>Dom's</h1>
          <h2>Photo Library</h2>
          <div className="header-links">
            <div className="header-link">
              <FontAwesomeIcon icon={faInstagram} />
            </div>
            <div className="header-link">
              <FontAwesomeIcon icon={faFlickr} />
            </div>
            <div className="header-link">
              <FontAwesomeIcon icon={faShareNodes} />
            </div>
            <div className="header-link">
              <img className="my-logo" src={myLogo} alt="my logo" />
            </div>
          </div>
        </div>

        <img
          className="header-image"
          src="https://farm66.staticflickr.com/65535/53406868026_1b0e9f7d53.png"
          alt="header"
        />
      </header>
      {!isPhotosLoading ? (
        <ul className="photo-gallery-list">
          {PhotoData.photoset?.photo.map((photo: any, index: number) => (
            <li key={index} className="photo-item">
              <img
                src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.png`}
                alt={photo.id}
                onClick={() =>
                  imageClickHandler(
                    photo.farm,
                    photo.server,
                    photo.id,
                    photo.secret
                  )
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="photo-gallery-background" />
      )}
    </div>
  );

  const imageDetails = (
    <>
      <div className="photo-item-details" onClick={resetClick}>
        {image}
      </div>
    </>
  );

  return (
    <>
      <div className="photo-gallery-container">
        {clicked ? (
          <div className="photo-item-container">{imageDetails}</div>
        ) : null}
        {photoGallery}
      </div>
    </>
  );
}
