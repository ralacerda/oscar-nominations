import { err, ok, ResultAsync } from "neverthrow";
import { movies } from "~~/database/schema/movies";
import { getMovieId, getMovieDetails } from "~~/server/services/tmdb";

export default eventHandler(async (event) =>
  validateBody(event, (z) =>
    z.object({
      id: z.string(),
    }),
  )
    .andThen((body) => getMovieId(body.id))
    .andThen(getMovieDetails)
    .map(createMovieInstance)
    .andThen(insertMovie)
    .mapErr((error) => {
      switch (error.type) {
        case "TMDBApi":
          return createError({
            statusCode: 500,
            statusMessage: error.message,
          });
        case "NotFound":
          return createError({
            statusCode: 404,
            statusMessage: "Movie not found",
          });
        case "InvalidInput":
          return createError({
            statusCode: 400,
            statusMessage: error.message,
          });
        case "ParsingBody":
          return createError({
            statusCode: 400,
          });
        case "DatabaseError":
          return createError({
            statusCode: 500,
            cause: error.cause,
          });
        case "DatabaseNoRowEffectedError":
          return createError({
            statusCode: 200,
            statusMessage: error.message,
          });
        default:
          error satisfies never;
          return createError({
            statusCode: 500,
            statusMessage: "Unknown error",
          });
      }
    }),
);

function insertMovie(movie: Movie): ResultAsync<void, DatabaseError | DatabaseNoRowEffectedError> {
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
    return ok();
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
