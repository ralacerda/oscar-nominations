type ProfileImageSize = "w45" | "w185" | "h632";
type BackdropImageSize = "w300" | "w780" | "w1280";
type LogoImageSize = "w45" | "w92" | "w154" | "w185" | "w300" | "w500";
type PosterImageSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780";

const baseURL = "https://image.tmdb.org/t/p";

export function getProfileImageURL(
  path: string,
  size: ProfileImageSize = "w185",
) {
  return `${baseURL}/${size}/${path}`;
}

export function getBackdropImageURL(
  path: string,
  size: BackdropImageSize = "w780",
) {
  return `${baseURL}/${size}/${path}`;
}

export function getLogoImageURL(path: string, size: LogoImageSize = "w185") {
  return `${baseURL}/${size}/${path}`;
}

export function getPosterImageURL(
  path: string,
  size: PosterImageSize = "w185",
) {
  return `${baseURL}/${size}/${path}`;
}
