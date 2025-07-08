export function genderFromNumber(number: number) {
  switch (number) {
    case 0:
      return "Not-set";
    case 1:
      return "Female";
    case 2:
      return "Male";

    case 3:
      return "Non-binary";
    default:
      return "Not-set";
  }
}

export function getMainCast(cast: TMDBMovieWithCredits["credits"]["cast"]) {
  return cast.toSorted((a, b) => a.order - b.order).slice(0, 5);
}

export function filterCrewJobs(crew: TMDBMovieWithCredits["credits"]["crew"]) {
  return crew.filter((crew) =>
    ["Writer", "Director", "Book"].includes(crew.job),
  );
}
