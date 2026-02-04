import { z } from "zod";

const NominationParams = z.object({
  award: z.string().trim().min(1),
  oscar: z.coerce.number(),
});

export default eventHandler(async (event) => {
  const { award, oscar } = await getValidatedRouterParams(event, (data) =>
    NominationParams.parse(data),
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
