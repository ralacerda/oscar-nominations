import { z } from "zod";

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (data) =>
    z.object({ id: z.coerce.number() }).parse(data),
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
