export const API_METHODS = {
  GET_PHOTOS: "flickr.photosets.getPhotos",
  GET_LOCATION: "flickr.photos.geo.getLocation",
  GET_EXIF: "flickr.photos.getExif",
  GET_SIZE: "flickr.photos.getSizes",
};

export const EXIF_ATTRIBUTES = [
  "Make",
  "Model",
  "ExposureTime",
  "FNumber",
  "ISO",
  "LensInfo",
];

export const MEDIA_URL =
  "https://dominicknitecki-media.s3.us-east-2.amazonaws.com/";

export const MEDIA_FILES = {
  dnIcon: `${MEDIA_URL}dn-icon.png`,
  dnLogo: `${MEDIA_URL}dn-logo.png`,
  dnSignature: `${MEDIA_URL}dn-signature.png`,
  headerimage:
    "https://live.staticflickr.com/65535/53406868026_1b0e9f7d53_b.png",
};

export const SHARE_DATA = {
  text: "Thanks for sharing!",
  url: "https://photos.dominicknitecki.com",
};

export const STATUS = {
  ok: "ok",
  fail: "fail",
};

export const MESSAGE = {
  loading: "Loading...",
  noAttr: "No Camera Attribute Data Available.",
};
