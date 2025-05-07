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

    const result = await client<FindResponsePerson>(`find/${id}`, {
      query: {
        external_source: "imdb_id",
      },
    });

    if (result.person_results.length > 0) {
      const person = result.person_results[0];
      return {
        name: person.name,
        profile_path: person.profile_path,
      };
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
