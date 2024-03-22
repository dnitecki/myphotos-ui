import React from "react";
import {
  getExifData,
  getOriginalPhotoUrl,
  getPhotosLocation as getPhotoLocation,
} from "../../services/photoService";
import { useQuery } from "react-query";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "./PhotoDetails.scss";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { requestFullImage, saveImage } from "../../utils/photoUtils";

export default function PhotoDetails({ image }: any) {
  const photoId = image?.props?.itemID;
  const markerIcon = new L.Icon({
    iconUrl: markerIconPng,
  });

  const {
    isError: isLocationError,
    isLoading: isLocationLoading,
    data: locationData,
  } = useQuery(["photoLocation", photoId], () => getPhotoLocation(photoId));

  const {
    isError: isExifError,
    isLoading: isExifLoading,
    data: exifData,
  } = useQuery(["photoExif", photoId], () => getExifData(photoId));

  const { data: sizeData } = useQuery(["photoSize", photoId], () =>
    getOriginalPhotoUrl(photoId)
  );

  return (
    <>
      <div className="photo-item-drawer">
        <div className="photo-item-size">
          <p>
            Original ({sizeData?.width} &times; {sizeData?.height})
          </p>
        </div>
        <div className="photo-item-links">
          <FullscreenRoundedIcon
            fontSize="inherit"
            onClick={() => requestFullImage(sizeData.source)}
          />
          <DownloadRoundedIcon
            fontSize="inherit"
            onClick={() => saveImage(sizeData.source)}
          />
        </div>
      </div>
      <h1>Photo Details</h1>
      <div className="photo-details-container">
        {isLocationLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {!isLocationError ? (
              <>
                <div className="photo-map-container">
                  <MapContainer
                    center={locationData.latLong}
                    zoom={8}
                    scrollWheelZoom={false}
                    attributionControl={false}
                    zoomControl={false}
                    dragging={false}
                  >
                    <TileLayer url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png" />
                    <Marker
                      position={locationData.latLong}
                      icon={markerIcon}
                    ></Marker>
                  </MapContainer>
                </div>
                <ul
                  className="location-details-list
                "
                >
                  {locationData.locationDataList?.map((item, index) => (
                    <li key={index} className="location-details-item">
                      <item.icon className="icon" fontSize="inherit" />
                      <h4 className="value">{item.value}</h4>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              "No Geographic Data Available"
            )}
          </>
        )}
        <hr />
        <>
          {isExifLoading ? (
            <div>Loading...</div>
          ) : (
            <ul className="attribute-list">
              {!isExifError
                ? exifData.map((item, index) => (
                    <li key={index} className="attribute-item">
                      <item.icon className="icon" fontSize="inherit" />
                      <h4 className="value">{item.value}</h4>
                    </li>
                  ))
                : "No Camera Attribute Data Available"}
            </ul>
          )}
        </>
      </div>
    </>
  );
}
