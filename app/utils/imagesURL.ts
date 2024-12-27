type BackdropImageSize = "w300" | "w780" | "w1280";
type LogoImageSize = "w45" | "w92" | "w154" | "w185" | "w300" | "w500";

const baseURL = "https://image.tmdb.org/t/p";

export function getBackdropImageURL(
  path: string | null,
  size: BackdropImageSize = "w780",
) {
  return `${baseURL}/${size}/${path}`;
}

export function getLogoImageURL(path: string, size: LogoImageSize = "w185") {
  return `${baseURL}/${size}/${path}`;
}
