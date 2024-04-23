import React, { useCallback, useRef, useState } from "react";
import "./PhotoGallery.scss";
import { getPhotosList } from "../../services/photoService";
import PhotoDetails from "../photoDetails/PhotoDetails";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { useQuery } from "@tanstack/react-query";
import { MEDIA_FILES, SHARE_DATA } from "../../utils/constants";

export default function PhotoGallery() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [image, setImage] = useState<JSX.Element>(null);
  const [scrollOpacity, setScrollOpacity] = useState<number>(null);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeDistance = 75;

  const { isLoading: isPhotosLoading, data: PhotoData } = useQuery({
    queryKey: ["photoList"],
    queryFn: () => getPhotosList(),
  });

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isRightSwipe) {
      resetClick();
    }
  };

  const resetClick = () => {
    setClicked(!clicked);
  };

  const handleScroll = useCallback((event: any) => {
    const scrollTop = event.currentTarget.scrollTop;
    setScrollOpacity(1 - scrollTop / 500);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share(SHARE_DATA);
    } catch (error) {}
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
    <div onScroll={handleScroll} className="photo-gallery-parallax">
      <header
        className="photo-gallery-header"
        style={{ opacity: scrollOpacity }}
      >
        <div className="header-text">
          <div className="header-signature">
            <img src={MEDIA_FILES.dnSignature} alt="Dom's" />
          </div>
          <h2>Photo Library</h2>
          <div className="header-links">
            <div className="header-link">
              <a
                href="https://www.instagram.com/dominick_nitecki/"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon fontSize="inherit" />
              </a>
            </div>
            <div className="header-link">
              <a
                href="https://www.flickr.com/photos/199729283@N07/"
                target="_blank"
                rel="noreferrer"
              >
                <PhotoLibraryRoundedIcon fontSize="inherit" />
              </a>
            </div>
            <div className="header-link">
              <a
                href="https://www.dominicknitecki.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="my-logo"
                  src={MEDIA_FILES.dnIcon}
                  alt="my logo"
                />
              </a>
            </div>
            <div className="header-link" onClick={handleShare}>
              <ShareRoundedIcon fontSize="inherit" />
            </div>
          </div>
        </div>

        <img
          className="header-image"
          src={MEDIA_FILES.headerimage}
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
      <div
        className="photo-item-details"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="photo-back-button">
          <WestRoundedIcon fontSize="inherit" onClick={resetClick} />
        </div>
        <div className="photo-item-image" id="selected-image">
          {image}
        </div>
        <PhotoDetails image={image} />
      </div>
    </>
  );

  return (
    <>
      <div className="photo-gallery-container">
        <div className={`photo-item-container ${clicked ? "show" : "hide"}`}>
          {imageDetails}
        </div>
        {photoGallery}
      </div>
    </>
  );
}
