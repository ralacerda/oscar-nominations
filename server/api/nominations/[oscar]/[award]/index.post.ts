import * as v from "valibot";
import { nominations } from "~~/database/schema";

const NominationBodyScheme = v.object({
  movie: v.number(),
  nominee: v.optional(v.number()),
  won: v.optional(v.boolean()),
});

const NominationParams = v.object({
  oscar: v.pipe(v.string(), v.transform(Number)),
  award: v.pipe(v.string(), v.trim(), v.nonEmpty()),
});

export default eventHandler(async (event) => {
  const { movie, nominee, won } = await readValidatedBody(event, (data) =>
    v.parse(NominationBodyScheme, data),
  );

  const { oscar, award } = await getValidatedRouterParams(event, (data) =>
    v.parse(NominationParams, data),
  );

  await $fetch("/api/movie/", {
    method: "POST",
    body: {
      id: movie,
    },
  });

  await db.insert(nominations).values({
    awardId: award,
    movieId: movie,
    oscarId: oscar,
    nomineeId: nominee,
    won,
  });
});
