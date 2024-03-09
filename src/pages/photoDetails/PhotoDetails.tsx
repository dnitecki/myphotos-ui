import React from "react";
import {
  getExifData,
  getPhotosLocation as getPhotoLocation,
} from "../../services/photoService";
import { useQuery } from "react-query";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "./PhotoDetails.scss";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";

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

  const latitude = Number(locationData?.latitude);
  const longitude = Number(locationData?.longitude);
  const latLong: L.LatLngExpression = {
    lat: latitude,
    lng: longitude,
  };
  const locationDataList = [
    { icon: FaLocationCrosshairs, value: `${latitude}, ${longitude}` },
    {
      icon: FaMapPin,
      value: `${locationData?.locality._content}, ${locationData?.region._content}, ${locationData?.country._content}.`,
    },
  ];

  return (
    <>
      <div className="photo-details-container">
        <h1>Photo Details</h1>
        {isLocationLoading ? (
          "Loading map..."
        ) : (
          <>
            {!isLocationError ? (
              <>
                <div className="photo-map-container">
                  <MapContainer
                    center={latLong}
                    zoom={8}
                    scrollWheelZoom={false}
                    attributionControl={false}
                    zoomControl={false}
                    dragging={false}
                  >
                    <TileLayer url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png" />
                    <Marker position={latLong} icon={markerIcon}></Marker>
                  </MapContainer>
                </div>
                <ul
                  className="location-details-list
                "
                >
                  {locationDataList.map((item, index) => (
                    <li key={index} className="location-details-item">
                      <item.icon className="icon" />
                      <h4 className="value">{item.value}</h4>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              "No Geographic data available"
            )}
          </>
        )}
        <hr />
        <>{!isExifError ? <div>{isExifLoading}</div> : ""}</>
      </div>
    </>
  );
}
