import { z } from "zod";

const paramsScheme = z.object({
  id: z.string(),
});

export default cachedEventHandler(
  async (event) => {
    const { id } = await getValidatedRouterParams(event, (data) =>
      paramsScheme.parse(data),
    );

    const key = useRuntimeConfig(event).tmdbAccessToken;
    const client = createTMDbClient(key);

    const { results } = await client<TMDbProvider>(
      `/movie/${id}/watch/providers`,
    );

    if ("BR" in results) {
      return results.BR;
    }

    throw createError({
      statusCode: 404,
      message: "No providers found",
    });
  },
  {
    getKey: (event) => event.path,
    maxAge: 60 * 60 * 24,
  },
);
