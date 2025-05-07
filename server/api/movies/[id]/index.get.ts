import * as v from "valibot";

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (data) =>
    v.parse(v.object({ id: v.pipe(v.string(), v.transform(Number)) }), data),
  );

  return await db.query.movies.findFirst({
    where: (movies, { eq }) => eq(movies.id, id),
    with: {
      nominations: true,
    },
  });
});
