import React from "react";
import { getPhotosLocation as getPhotoLocation } from "../../services/photoService";
import { useQuery } from "react-query";

export default function PhotoDetails({ image }: any) {
  const photoId = image?.props?.itemID;

  const { isLoading, data: locationData } = useQuery(
    ["photoLocation", photoId],
    () => getPhotoLocation(photoId)
  );
  return (
    <>
      <div>{photoId}</div>
      <div>{locationData?.latitude}</div>
      <div>{locationData?.longitude}</div>
    </>
  );
}
