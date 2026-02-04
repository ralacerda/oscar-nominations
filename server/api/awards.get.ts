import { z } from "zod";

const AwardsScheme = z.object({
  shorts: z.union([z.literal("include"), z.literal("exclude")]).optional(),
});

export default eventHandler(async (event) => {
  const { shorts } = await getValidatedQuery(event, (data) =>
    AwardsScheme.parse(data),
  );

  if (!shorts) {
    const result = await db.query.awards.findMany();
    console.log(result);
    return result;
  }

  return db.query.awards.findMany({
    where: (awards, { eq }) => eq(awards.short, shorts === "include"),
  });
});
