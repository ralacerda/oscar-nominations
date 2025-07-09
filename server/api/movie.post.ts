import { ResultAsync } from "neverthrow";
import { movies } from "~~/database/schema/movies";

export default eventHandler(async (event) =>
  validateBody(event, (z) =>
    z.object({
      id: z.string(),
    }),
  )
    .andThen((body) => getMovie(body.id))
    .andThen(insertMovie),
);

function insertMovie(movie: Movie) {
  return ResultAsync.fromPromise(
    db.insert(movies).values(movie),
    (e) => new DatabaseError(e),
  );
}
