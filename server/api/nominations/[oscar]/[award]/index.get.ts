import * as v from "valibot";

const NominationParams = v.object({
  award: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  oscar: v.pipe(v.string(), v.transform(Number)),
});

export default eventHandler(async (event) => {
  const { award, oscar } = await getValidatedRouterParams(event, (data) =>
    v.parse(NominationParams, data),
  );

  return await db.query.nominations.findMany({
    where: (nomineers, { eq, and }) =>
      and(eq(nomineers.awardId, award), eq(nomineers.oscarId, oscar)),
    with: {
      movie: true,
      nominee: true,
    },
    columns: {
      id: true,
      movieId: true,
      won: true,
    },
  });
});
