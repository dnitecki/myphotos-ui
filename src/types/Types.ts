export type ExifType = {
  clean?: {};
  label: string;
  raw: {
    _content: string;
  };
  tag: string;
  tagspace: string;
  tagspaceid: number;
};

export type LocationDataType = {
  latitude: string;
  longitude: string;
  locality?: {
    _content: string;
  };
  county?: {
    _content: string;
  };
  region?: {
    _content: string;
  };
  country?: {
    _content: string;
  };
  neighbourhood?: {
    _content: string;
  };
};
