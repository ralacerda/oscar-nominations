import type { Result } from "neverthrow";
import { ResultAsync, err, ok } from "neverthrow";
import { genderFromNumber } from "./credits";
import type { TMDBMovieWithCredits } from "~~/shared/types/tmdb";

type GetMovieError =
  | { type: "tmdb-error"; message: string; cause: unknown }
  | { type: "not-found" };

export function getMovie(imdbId: string) {
  return getMovieId(imdbId)
    .andThen(getFirstFoundMovie)
    .andThen(getMovieDetails)
    .map(extractMovieDetails);
}

function getMovieId(
  imdbId: string,
): ResultAsync<FindResponseMovie, GetMovieError> {
  return ResultAsync.fromPromise(
    TMDbClient<FindResponseMovie>(`find/${imdbId}`, {
      query: {
        external_source: "imdb_id",
      },
    }),
    (e) => ({
      type: "tmdb-error",
      message: "Error fetching movie ID",
      cause: e,
    }),
  );
}

function getFirstFoundMovie(
  response: FindResponseMovie,
): Result<number, GetMovieError> {
  if (response.movie_results.length === 0) {
    return err({ type: "not-found" });
  }

  return ok(response.movie_results[0].id);
}

function getMovieDetails(
  tmdbId: number,
): ResultAsync<TMDBMovieWithCredits, GetMovieError> {
  return ResultAsync.fromPromise(
    TMDbClient<TMDBMovieWithCredits>(`movie/${tmdbId}`, {
      query: {
        append_to_response: "credits",
      },
    }),
    (e) => ({
      type: "tmdb-error",
      message: "Error fetching movie details",
      cause: e,
    }),
  );
}

function extractMovieDetails(movie: TMDBMovieWithCredits): Movie {
  return {
    id: movie.id,
    backdropPath: movie.backdrop_path,
    originalTitle: movie.original_title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    runtime: movie.runtime,
    title: movie.title,
    genres: movie.genres.map((g) => g.name),
    cast: getMainCast(movie.credits.cast).map((c) => ({
      name: c.name,
      profileImagePath: c.profile_path ?? undefined,
      character: c.character,
      gender: genderFromNumber(c.gender),
    })),
    crew: filterCrewJobs(movie.credits.crew).map((c) => ({
      name: c.name,
      profileImagePath: c.profile_path ?? undefined,
      job: c.job,
      gender: genderFromNumber(c.gender),
    })),
  };
}
