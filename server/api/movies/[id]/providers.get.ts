import * as v from "valibot";

const paramsScheme = v.object({
  id: v.string(),
});

export default cachedEventHandler(
  async (event) => {
    const { id } = await getValidatedRouterParams(event, (data) =>
      v.parse(paramsScheme, data),
    );

    const key = useRuntimeConfig(event).tmdbAccessToken;
    const client = createTMDbClient(key);

    const { results } = await client<Providers>(`${id}/watch/providers`);

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
