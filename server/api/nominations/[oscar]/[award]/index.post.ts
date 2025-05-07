import * as v from "valibot";
import { nominations } from "~~/database/schema/movies";

const MovieScheme = v.object({
  nomineeImdbCode: v.optional(v.string()),
  won: v.optional(v.boolean()),
  imdbCode: v.string(),
});

const NominationBodyScheme = v.union([v.array(MovieScheme), MovieScheme]);

const NominationParams = v.object({
  oscar: v.pipe(v.string(), v.transform(Number)),
  award: v.picklist(awardsKeys),
});

export default eventHandler(async (event) => {
  const _movies = await readValidatedBody(event, (data) =>
    v.parse(NominationBodyScheme, data),
  );

  const movies = Array.isArray(_movies) ? _movies : [_movies];

  const { oscar, award } = await getValidatedRouterParams(event, (data) =>
    v.parse(NominationParams, data),
  );

  for (const movie of movies) {
    const id = await $fetch(`/api/imdb/movie/${movie.imdbCode}`);

    const nominee = movie.nomineeImdbCode
      ? await $fetch(`/api/imdb/person/${movie.nomineeImdbCode}`)
      : undefined;

    await $fetch("/api/movie/", {
      method: "POST",
      body: {
        id,
      },
    });

    await db.insert(nominations).values({
      movieId: id,
      oscarId: oscar,
      awardId: award,
      nominee: nominee,
      won: movie.won,
    });

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
});
