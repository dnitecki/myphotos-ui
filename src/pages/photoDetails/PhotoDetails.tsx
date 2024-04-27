import React, { useMemo } from "react";
import {
  getExifData,
  getOriginalPhotoUrl,
  getPhotosLocation as getPhotoLocation,
} from "../../services/photoService";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import "./PhotoDetails.scss";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import {
  configureLocationList,
  requestFullImage,
  saveImage,
} from "../../utils/photoUtils";
import { MEDIA_FILES, MESSAGE, STATUS } from "../../utils/constants";

function PhotoDetails({ image }: any) {
  const mapMarker = useMemo(() => {
    const markerIcon = new L.Icon({
      iconSize: [35, 35],
      iconUrl: MEDIA_FILES.DN_LOGO,
      className: "map-marker",
    });
    return markerIcon;
  }, []);

  const photoId = image?.props?.itemID;

  const { isLoading: isLocationLoading, data: locationData } = useQuery({
    queryKey: ["photoLocation", photoId],
    queryFn: () => getPhotoLocation(photoId),
  });

  const { isLoading: isExifLoading, data: exifData } = useQuery({
    queryKey: ["photoExif", photoId],
    queryFn: () => getExifData(photoId),
  });

  const { data: sizeData } = useQuery({
    queryKey: ["photoSize", photoId],
    queryFn: () => getOriginalPhotoUrl(photoId),
  });

  const { latLong, locationDataList } = configureLocationList(
    locationData?.photo?.location
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
          <p>{MESSAGE.LOADING}</p>
        ) : (
          <>
            {locationData.stat === STATUS.OK ? (
              <>
                <div className="photo-map-container">
                  <MapContainer
                    center={latLong}
                    zoom={12}
                    attributionControl={false}
                    zoomControl={false}
                    scrollWheelZoom={true}
                    dragging={false}
                  >
                    <TileLayer url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png" />
                    <Marker position={latLong} icon={mapMarker}></Marker>
                  </MapContainer>
                </div>
                <ul
                  className="location-details-list
                "
                >
                  {locationDataList?.map((item, index) => (
                    <li key={index} className="location-details-item">
                      <item.icon className="icon" fontSize="inherit" />
                      <h4 className="value">{item.value}</h4>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>{locationData.message}</p>
            )}
          </>
        )}
        <hr />
        <>
          {isExifLoading ? (
            <p>{MESSAGE.LOADING}</p>
          ) : (
            <ul className="attribute-list">
              {exifData ? (
                exifData.map((item, index) => (
                  <li key={index} className="attribute-item">
                    <item.icon className="icon" fontSize="inherit" />
                    <h4 className="value">{item.value}</h4>
                  </li>
                ))
              ) : (
                <p>{MESSAGE.NO_ATTRIBUTE}</p>
              )}
            </ul>
          )}
        </>
      </div>
    </>
  );
}
export default React.memo(PhotoDetails);
