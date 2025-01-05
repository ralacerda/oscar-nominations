import * as v from "valibot";
import { watchlist } from "~~/database/schema/users";

const params = v.object({
  id: v.pipe(v.string(), v.transform(Number)),
});

const query = v.object({
  "movie-id": v.pipe(v.string(), v.transform(Number)),
});

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (data) =>
    v.parse(params, data),
  );

  const { "movie-id": movieId } = await getValidatedQuery(event, (data) =>
    v.parse(query, data),
  );

  const result = await db.insert(watchlist).values({
    userId: id,
    movieId,
  });

  return result;
});
