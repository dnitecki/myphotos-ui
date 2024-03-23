import { BASE_URL, FLIKR_CREDS } from "../utils/secrets";
import axios from "axios";
import { API_METHODS, EXIF_ATTRIBUTES } from "../utils/constants";
import { ExifType } from "../types/Types";
import { configureExifList } from "../utils/photoUtils";

const { API_KEY, USER_ID, PHOTOSET_ID } = FLIKR_CREDS;

export const getPhotosList = async () => {
  const url = `${BASE_URL}?method=${API_METHODS.GET_PHOTOS}&api_key=${API_KEY}&photoset_id=${PHOTOSET_ID}&user_id=${USER_ID}&format=json&nojsoncallback=1`;
  const result = await axios.get(url, {
    headers: { "Content-Type": "application/json" },
  });
  return result.data;
};

export const getPhotosLocation = async (PHOTO_ID: string) => {
  const url = `${BASE_URL}?method=${API_METHODS.GET_LOCATION}&api_key=${API_KEY}&photo_id=${PHOTO_ID}&format=json&nojsoncallback=1`;
  const result = await axios.get(url, {
    headers: { "Content-Type": "application/json" },
  });
  return result.data.photo.location;
};

export const getExifData = async (PHOTO_ID: string) => {
  const url = `${BASE_URL}?method=${API_METHODS.GET_EXIF}&api_key=${API_KEY}&photo_id=${PHOTO_ID}&format=json&nojsoncallback=1`;
  const result = await axios.get(url, {
    headers: { "Content-Type": "application/json" },
  });
  const exifData: ExifType[] = result.data.photo.exif;
  const filteredExifData = exifData.filter((attribute) =>
    EXIF_ATTRIBUTES.includes(attribute.tag)
  );
  return configureExifList(filteredExifData);
};

export const getOriginalPhotoUrl = async (PHOTO_ID: string) => {
  const url = `${BASE_URL}?method=${API_METHODS.GET_SIZE}&api_key=${API_KEY}&photo_id=${PHOTO_ID}&format=json&nojsoncallback=1`;
  const result = await axios.get(url, {
    headers: { "Content-Type": "application/json" },
  });
  const sizeList = result.data.sizes.size.filter(
    (sizes: { label: string }) => sizes.label === "Original"
  );
  return sizeList[0];
};
