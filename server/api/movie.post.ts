import { err, ok, ResultAsync } from "neverthrow";
import { movies } from "~~/database/schema/movies";
import { getMovieId, getMovieDetails } from "~~/server/services/tmdb";
import type * as z from "zod/v4";

export default eventHandler((event) =>
  validateBody(event, moviePostBody)
    .andThen((body) => getMovieId(body.id))
    .andThen(getMovieDetails)
    .map(createMovieInstance)
    .andThen(insertMovie),
);

function moviePostBody(zod: typeof z) {
  return zod.object({
    id: zod.string(),
  });
}

function insertMovie(
  movie: Movie,
): ResultAsync<string, DatabaseError | DatabaseNoRowEffectedError> {
  return ResultAsync.fromPromise(db.insert(movies).values(movie).onConflictDoNothing(), (e) => ({
    type: "DatabaseError" as const,
    cause: e as Error,
  })).andThen((result) => {
    if (result.rowsAffected === 0) {
      return err({
        type: "DatabaseNoRowEffectedError" as const,
        message: `No row was inserted for movie with ID ${movie.id}`,
      });
    }
    return ok("okay");
  });
}

export type DatabaseError = {
  type: "DatabaseError";
  cause: Error;
};

export type DatabaseNoRowEffectedError = {
  type: "DatabaseNoRowEffectedError";
  message: string;
};

function createMovieInstance(tmdbMovieWithCredits: TMDBMovieWithCredits): Movie {
  return {
    id: tmdbMovieWithCredits.id,
    backdropPath: tmdbMovieWithCredits.backdrop_path,
    originalTitle: tmdbMovieWithCredits.original_title,
    overview: tmdbMovieWithCredits.overview,
    posterPath: tmdbMovieWithCredits.poster_path,
    runtime: tmdbMovieWithCredits.runtime,
    title: tmdbMovieWithCredits.title,
    genres: tmdbMovieWithCredits.genres.map((g) => g.name),
    cast: getMainCast(tmdbMovieWithCredits.credits.cast).map((c) => ({
      name: c.name,
      profileImagePath: c.profile_path ?? undefined,
      character: c.character,
      gender: genderFromNumber(c.gender),
    })),
    crew: filterCrewJobs(tmdbMovieWithCredits.credits.crew).map((c) => ({
      name: c.name,
      profileImagePath: c.profile_path ?? undefined,
      job: c.job,
      gender: genderFromNumber(c.gender),
    })),
  };
}
