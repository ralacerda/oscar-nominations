import * as v from "valibot";

const paramsScheme = v.object({
  id: v.string(),
});

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (data) =>
    v.parse(paramsScheme, data),
  );

  const movieId = await getMovie(id);

  return movieId.mapErr((error) =>
    error.type == "not-found"
      ? createError({
          statusCode: 404,
          statusMessage: error.type,
        })
      : createError({
          statusCode: 500,
          statusMessage: `${error.type} - ${error.cause}`,
          cause: error.cause,
        }),
  );
});
