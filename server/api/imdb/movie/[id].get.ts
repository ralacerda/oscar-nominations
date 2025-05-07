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

    const result = await client<FindResponseMovie>(`find/${id}`, {
      query: {
        external_source: "imdb_id",
      },
    });

    if (result.movie_results.length > 0) {
      return result.movie_results[0].id;
    }

    throw createError({
      statusCode: 404,
      message: "Movie not found",
    });
  },
  {
    getKey: (event) => event.path,
    maxAge: 60 * 60 * 24,
  },
);
