import React, { useState } from "react";
import "./PhotoGallery.scss";
import { getPhotosList } from "../../services/photoService";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faFlickr } from "@fortawesome/free-brands-svg-icons/faFlickr";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons/faArrowLeftLong";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import myLogo from "../../assets/MyLogo.png";
import PhotoDetails from "../photoDetails/PhotoDetails";

export default function PhotoGallery() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [image, setImage] = useState(null);
  const [scrollY, setScrollY] = useState<number>(0);

  const { isLoading: isPhotosLoading, data: PhotoData } = useQuery(
    ["photoList"],
    getPhotosList
  );

  const shareData = {
    text: "Thanks for sharing!",
    url: "https://photos.dominicknitecki.com",
  };

  const resetClick = () => {
    setClicked(!clicked);
  };

  const handleScroll = (event: any) => {
    setScrollY(event.currentTarget.scrollTop);
  };

  const handleShare = async () => {
    try {
      await navigator.share(shareData);
    } catch (error) {
      window.alert(error);
    }
  };
  const imageClickHandler = (
    farm: string,
    server: string,
    id: string,
    secret: any,
    title: string
  ) => {
    const image: JSX.Element = (
      <img
        src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.png`}
        alt={title}
        itemID={id}
      />
    );
    setClicked(!clicked);
    setImage(image);
  };

  const photoGallery = (
    <div
      onScroll={handleScroll}
      className={
        clicked ? "photo-gallery-parallax-hidden" : "photo-gallery-parallax"
      }
    >
      <header
        className="photo-gallery-header"
        style={{ opacity: `${1 - scrollY / 500}` }}
      >
        <div className="header-text">
          <h1>Dom's</h1>
          <h2>Photo Library</h2>
          <div className="header-links">
            <div className="header-link">
              <a
                href="https://www.instagram.com/dominick_nitecki/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
            <div className="header-link">
              <a
                href="https://www.flickr.com/photos/199729283@N07/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFlickr} />
              </a>
            </div>
            <div className="header-link">
              <a
                href="https://www.dominicknitecki.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img className="my-logo" src={myLogo} alt="my logo" />
              </a>
            </div>
            <div className="header-link" onClick={handleShare}>
              <FontAwesomeIcon icon={faPaperPlane} />
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
                    photo.secret,
                    photo.title
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
      <div className="photo-item-details">
        <div className="photo-back-button">
          <FontAwesomeIcon icon={faArrowLeftLong} onClick={resetClick} />
        </div>
        <div className="photo-item-image">{image}</div>
        <PhotoDetails image={image} />
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
