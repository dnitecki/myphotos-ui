import { ExifType } from "../types/Types";
import { saveAs } from "file-saver";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import IsoRoundedIcon from "@mui/icons-material/IsoRounded";
import ShutterSpeedRoundedIcon from "@mui/icons-material/ShutterSpeedRounded";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import { getOriginalPhotoUrl } from "../services/photoService";

export const configureExifList = (exifData: ExifType[]) => {
  const make = exifData.filter((attribute) => attribute.tag === "Make");
  const model = exifData.filter((attribute) => attribute.tag === "Model");
  const exposureTime = exifData.filter(
    (attribute) => attribute.tag === "ExposureTime"
  );
  const fNumber = exifData.filter((attribute) => attribute.tag === "FNumber");
  const iso = exifData.filter((attribute) => attribute.tag === "ISO");
  const lensInfo = exifData.filter((attribute) => attribute.tag === "LensInfo");

  const exifDataList = [
    {
      icon: CameraAltRoundedIcon,
      value: `${make[0].raw._content} ${model[0].raw._content}`,
    },
    {
      icon: ShutterSpeedRoundedIcon,
      value: exposureTime[0].raw._content,
    },
    {
      icon: CameraRoundedIcon,
      value: `f/${fNumber[0].raw._content}`,
    },
    {
      icon: IsoRoundedIcon,
      value: `ISO ${iso[0].raw._content}`,
    },
    {
      icon: VideocamRoundedIcon,
      value: lensInfo[0].raw._content,
    },
  ];
  return exifDataList;
};

export const configureLocationList = (locationData: any) => {
  const latitude = Number(locationData?.latitude);
  const longitude = Number(locationData?.longitude);
  const latLong: L.LatLngExpression = {
    lat: latitude,
    lng: longitude,
  };
  const locationDataList = [
    { icon: MyLocationRoundedIcon, value: `${latitude}, ${longitude}` },
    {
      icon: LocationOnRoundedIcon,
      value: `${locationData?.locality._content}, ${locationData?.region._content}, ${locationData?.country._content}.`,
    },
  ];
  return { latLong: latLong, locationDataList: locationDataList };
};

export const saveImage = async (photoId: string) => {
  const imageSizes: any = await getOriginalPhotoUrl(photoId);
  return saveAs(imageSizes.source, imageSizes.source);
};

export const requestFullImage = async (photoId: string) => {
  const imageSizes: any = await getOriginalPhotoUrl(photoId);
  window.location.assign(imageSizes.source);
};
