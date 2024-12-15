import * as v from "valibot";
import { nominations as _nominations } from "~~/database/schema";

const BatchScheme = v.object({
  award: v.string(),
  oscarId: v.number(),
  content: v.string(),
});

export default eventHandler(async (event) => {
  const { content, award, oscarId } = await readValidatedBody(event, (data) =>
    v.parse(BatchScheme, data),
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
        oscarId: oscarId,
        won: nomination.won,
      },
    });
  }
});
