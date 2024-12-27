import * as v from "valibot";

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (data) =>
    v.parse(v.object({ id: v.pipe(v.string(), v.transform(Number)) }), data),
  );

  return await db.query.movies.findFirst({
    where: (movies, { eq }) => eq(movies.id, id),
    with: {
      cast: {
        limit: 10,
        orderBy: (cast, { asc }) => asc(cast.order),
      },
      crew: {
        where: (crew, { eq }) => eq(crew.job, "Director"),
        with: {
          person: true,
        },
      },
    },
  });
});
