import * as v from "valibot";
import { nominations as _nominations } from "~~/database/schema";

const BatchScheme = v.object({
  content: v.string(),
});

const NominationParams = v.object({
  oscar: v.pipe(v.string(), v.transform(Number)),
  award: v.pipe(v.string(), v.trim(), v.nonEmpty()),
});

export default eventHandler(async (event) => {
  const { content } = await readValidatedBody(event, (data) =>
    v.parse(BatchScheme, data),
  );

  const { oscar, award } = await getValidatedRouterParams(event, (data) =>
    v.parse(NominationParams, data),
  );

  const awardInfo = await db.query.awards.findFirst({
    where: (awards, { eq }) => eq(awards.id, award),
    columns: {
      requiresNominee: true,
    },
  });

  if (!awardInfo) {
    throw new Error("Award not found");
  }

  const { requiresNominee } = awardInfo;

  const nominations = content.split("\n").map((line) => {
    if (requiresNominee) {
      const [movie, nominee, won] = line.split(",");
      return {
        movie,
        nominee,
        won: won == "true" ? true : false,
      };
    }

    const [movie, won] = line.split(",");
    return {
      movie,
      won: won == "true" ? true : false,
    };
  });

  console.log(nominations);

  for (const nomination of nominations) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    await $fetch("/api/nominations", {
      method: "POST",
      body: {
        award,
        movie: Number.parseInt(nomination.movie),
        nominee: nomination.nominee
          ? Number.parseInt(nomination.nominee)
          : undefined,
        oscarId: oscar,
        won: nomination.won,
      },
    });
  }
});
