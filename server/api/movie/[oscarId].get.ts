import { desc, gt, sql } from "drizzle-orm";
import * as v from "valibot";

const NominationOscarIdParams = v.object({
  oscarId: v.pipe(v.string(), v.transform(Number)),
});

export default eventHandler(async (event) => {
  const { oscarId } = await getValidatedRouterParams(event, (data) =>
    v.parse(NominationOscarIdParams, data),
  );

  return await db.query.movies.findMany({
    with: {
      nominations: {
        where: (nominations, { eq }) => eq(nominations.oscarId, oscarId),
      },
    },
    extras: {
      count:
        sql`(SELECT count(*) FROM nominations_table WHERE nominations_table.movie_id = movies.id AND nominations_table.oscar_id = ${oscarId})`.as(
          "count",
        ),
    },
    orderBy: desc(sql.identifier("count")),
    where: gt(sql.identifier("count"), 0),
  });
});
