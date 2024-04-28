import React from "react";
import { MEDIA_FILES, SHARE_DATA } from "../../utils/constants";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import "./Header.scss";

const Header = () => {
  const handleShare = async () => {
    try {
      await navigator.share(SHARE_DATA);
    } catch (error) {}
  };

  const gallery = document.getElementById("photo-gallery-parallax");
  gallery?.addEventListener(
    "scroll",
    function () {
      let header = document.getElementById("photo-gallery-header");
      const scrollTop = gallery.scrollTop;
      header.style.opacity = `${1 - scrollTop / 500}`;
    },
    false
  );

  return (
    <>
      <header className="photo-gallery-header" id="photo-gallery-header">
        <div className="header-text">
          <div className="header-signature">
            <img src={MEDIA_FILES.DN_SIGNATURE} alt="Dom's" />
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
                  src={MEDIA_FILES.DN_ICON}
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
          src={MEDIA_FILES.HEADER_IMAGE}
          alt="header"
        />
      </header>
    </>
  );
};

export default Header;
