import * as v from "valibot";

export default eventHandler(async (event) => {
  const key = useRuntimeConfig(event).tmdbAccessToken;
  const client = createTMDbClient(key);

  const { id } = await getValidatedRouterParams(event, (data) =>
    v.parse(v.object({ id: v.string() }), data),
  );

  const result = await client<PersonInfo>(`person/${id}`);

  if (result) {
    return result;
  }

  throw createError({
    statusCode: 404,
    message: "Person not found",
  });
});
