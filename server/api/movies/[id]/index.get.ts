import * as v from "valibot";

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (data) =>
    v.parse(v.object({ id: v.pipe(v.string(), v.transform(Number)) }), data),
  );

  return await db.query.movies.findFirst({
    where: (movies, { eq }) => eq(movies.id, id),
    with: {
      nominations: {
        with: {
          award: true,
          nominee: true,
        },
      },
      cast: {
        limit: 5,
        orderBy: (cast, { asc }) => asc(cast.order),
        with: {
          person: true,
        },
      },
      crew: {
        where: (crew, { eq, or }) =>
          or(
            eq(crew.job, "Director"),
            eq(crew.job, "Writer"),
            eq(crew.job, "Book"),
          ),
        with: {
          person: true,
        },
      },
    },
  });
});
