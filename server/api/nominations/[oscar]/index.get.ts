import { desc, gt, sql } from "drizzle-orm";
import * as v from "valibot";

const NominationOscarIdParams = v.object({
  oscar: v.pipe(v.string(), v.transform(Number)),
});

const NominationQuery = v.object({
  limit: v.optional(v.pipe(v.string(), v.transform(Number))),
});

export default eventHandler(async (event) => {
  const { oscar } = await getValidatedRouterParams(event, (data) =>
    v.parse(NominationOscarIdParams, data),
  );

  const { limit } = await getValidatedQuery(event, (data) =>
    v.parse(NominationQuery, data),
  );

  return await db.query.movies.findMany({
    with: {
      nominations: {
        where: (nominations, { eq }) => eq(nominations.oscarId, oscar),
        columns: { won: true },
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
