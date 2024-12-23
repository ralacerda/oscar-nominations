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
    where: (nominations, { eq, and }) =>
      and(eq(nominations.oscarId, oscar), eq(nominations.awardId, award)),
    with: {
      nominee: true,
      movie: {
        with: {
          nominations: {
            with: {
              award: true,
              nominee: true,
            },
          },
        },
      },
    },
  });
});
