import { err, ok, ResultAsync } from "neverthrow";
import { TaggedError } from "tagged-error";

class TMDBError extends TaggedError("TMDBError")<{
  cause?: Error;
}> {}

class NotFoundError extends TaggedError("NotFoundError")<{
  id: string;
}> {}

export function getMovieId(imdbId: string) {
  return ResultAsync.fromPromise(
    TMDbClient<FindResponseMovie>(`find/${imdbId}`, {
      query: {
        external_source: "imdb_id",
      },
    }),
    (e) =>
      new TMDBError({
        cause: e as Error,
      }),
  ).andThen((response) => {
    if (response.movie_results.length === 0) {
      return err(new NotFoundError({ id: imdbId }));
    }
    return ok(response.movie_results[0].id);
  });
}

export function getMovieDetails(tmdbId: number) {
  return ResultAsync.fromPromise(
    TMDbClient<TMDBMovieWithCredits>(`movie/${tmdbId}`, {
      query: {
        append_to_response: "credits",
      },
    }),
    (e) => ({
      type: "TMDBApi",
      message: "Error fetching movie details",
      cause: e as Error,
    }),
  );
}
