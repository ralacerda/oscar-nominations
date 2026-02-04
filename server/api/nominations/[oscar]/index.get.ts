import { desc, gt, sql } from "drizzle-orm";
import { z } from "zod";

const NominationOscarIdParams = z.object({
  oscar: z.coerce.number(),
});

const NominationQuery = z.object({
  limit: z.coerce.number().optional(),
});

export default eventHandler(async (event) => {
  const { oscar } = await getValidatedRouterParams(event, (data) =>
    NominationOscarIdParams.parse(data),
  );

  const { limit } = await getValidatedQuery(event, (data) =>
    NominationQuery.parse(data),
  );

  return await db.query.movies.findMany({
    with: {
      nominations: {
        where: (nominations, { eq }) => eq(nominations.oscarId, oscar),
        columns: { won: true, oscarId: true },
        with: {
          nominee: { columns: { name: true } },
          award: {
            columns: { id: true, title: true },
          },
        },
      },
    },
    extras: {
      count:
        sql`(SELECT count(*) FROM nominations_table WHERE nominations_table.movie_id = movies.id AND nominations_table.oscar_id = ${oscar})`.as(
          "count",
        ),
    },
    orderBy: desc(sql.identifier("count")),
    where: gt(sql.identifier("count"), 0),
    limit: limit,
  });
});
