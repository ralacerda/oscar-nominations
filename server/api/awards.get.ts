import * as v from "valibot";

const AwardsScheme = v.object({
  shorts: v.optional(v.union([v.literal("include"), v.literal("exclude")])),
});

export default eventHandler(async (event) => {
  const { shorts } = await getValidatedQuery(event, (data) =>
    v.parse(AwardsScheme, data),
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
