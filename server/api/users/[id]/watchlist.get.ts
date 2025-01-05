import * as v from "valibot";

const params = v.object({
  id: v.pipe(v.string(), v.transform(Number)),
});

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (data) =>
    v.parse(params, data),
  );

  const watchlist = await db.query.watchlist.findMany({
    where: (watchlist, { eq }) => eq(watchlist.userId, id),
    with: {
      movie: true,
    },
  });

  return watchlist;
});
