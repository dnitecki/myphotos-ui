import {
  BASE_URL,
  FLIKR_CREDS,
  GET_LOCATION_METHOD,
  GET_PHOTOS_METHOD,
} from "../utils/secrets";
import axios from "axios";

const { API_KEY, USER_ID, PHOTOSET_ID } = FLIKR_CREDS;

export const getPhotosList = async () => {
  const url = `${BASE_URL}?method=${GET_PHOTOS_METHOD}&api_key=${API_KEY}&photoset_id=${PHOTOSET_ID}&user_id=${USER_ID}&format=json&nojsoncallback=1`;
  const result = await axios.get(url, {
    headers: { "Content-Type": "application/json" },
  });
  return result.data;
};

export const getPhotosLocation = async (PHOTO_ID: string) => {
  const url = `${BASE_URL}?method=${GET_LOCATION_METHOD}&api_key=${API_KEY}&photo_id=${PHOTO_ID}&format=json&nojsoncallback=1`;
  const result = await axios.get(url, {
    headers: { "Content-Type": "application/json" },
  });
  return result.data.photo.location;
};
