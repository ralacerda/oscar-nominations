import { z } from "zod";

const paramsScheme = z.object({
  id: z.string(),
});

type TMDBFindResponse = {
  movie_results: {
    id: number;
  }[];
};

export default cachedEventHandler(
  async (event) => {
    const { id } = await getValidatedRouterParams(event, (data) =>
      paramsScheme.parse(data),
    );

    const key = useRuntimeConfig(event).tmdbAccessToken;
    const client = createTMDbClient(key);

    const result = await client<TMDBFindResponse>(`find/${id}`, {
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
