import React from "react";
import { getPhotosLocation as getPhotoLocation } from "../../services/photoService";
import { useQuery } from "react-query";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "./PhotoDetails.scss";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function PhotoDetails({ image }: any) {
  const photoId = image?.props?.itemID;
  const markerIcon = new L.Icon({
    iconUrl: markerIconPng,
  });

  const {
    isError,
    isLoading,
    data: locationData,
  } = useQuery(["photoLocation", photoId], () => getPhotoLocation(photoId));

  const latitude = Number(locationData?.latitude);
  const longitude = Number(locationData?.longitude);
  const latLong: L.LatLngExpression = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <>
      <div className="photo-details-container">
        <br />
        <h1>Photo Details</h1>
        {isLoading ? (
          "Loading map..."
        ) : (
          <>
            {!isError ? (
              <>
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
                <p>
                  Latitude: {latitude}
                  <br />
                  Longitude: {longitude}
                </p>
              </>
            ) : (
              "No Geographic data available"
            )}
          </>
        )}
      </div>
    </>
  );
}
