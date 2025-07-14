import { err, ok, ResultAsync } from "neverthrow";

type TMDBError = { type: "TMDBApi"; message: string; cause: Error };
type NotFoundError = { type: "NotFound" };

export function getMovieId(imdbId: string): ResultAsync<number, TMDBError | NotFoundError> {
  return ResultAsync.fromPromise(
    TMDbClient<FindResponseMovie>(`find/${imdbId}`, {
      query: {
        external_source: "imdb_id",
      },
    }),
    (e) => ({
      type: "TMDBApi" as const,
      message: "Error fetching movie ID",
      cause: e as Error,
    }),
  ).andThen((response) => {
    if (response.movie_results.length === 0) {
      return err({ type: "NotFound" as const });
    }
    return ok(response.movie_results[0].id);
  });
}

export function getMovieDetails(tmdbId: number): ResultAsync<TMDBMovieWithCredits, TMDBError> {
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
