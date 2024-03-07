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

  const { isLoading, data: locationData } = useQuery(
    ["photoLocation", photoId],
    () => getPhotoLocation(photoId)
  );

  const latitude = Number(locationData?.latitude);
  const longitude = Number(locationData?.longitude);
  const latLong: L.LatLngExpression = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <>
      <div className="photo-details-container">
        {isLoading ? (
          ""
        ) : (
          <MapContainer center={latLong} zoom={8} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={latLong} icon={markerIcon}></Marker>
          </MapContainer>
        )}
      </div>
    </>
  );
}
