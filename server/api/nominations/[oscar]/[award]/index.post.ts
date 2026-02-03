import * as v from "valibot";
import { nominations } from "~~/database/schema/movies";

const MovieScheme = v.object({
  id: v.union([v.string(), v.number()]),
  nominee: v.union([v.string(), v.number(), v.undefined()]),
  won: v.optional(v.boolean()),
  imdbCode: v.optional(v.boolean()),
});

const NominationBodyScheme = v.union([v.array(MovieScheme), MovieScheme]);

const NominationParams = v.object({
  oscar: v.pipe(v.string(), v.transform(Number)),
  award: v.pipe(v.string(), v.trim(), v.nonEmpty()),
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
    if (movie.imdbCode) {
      const id = await $fetch(`/api/imdb/movie/${movie.id}`);

      movie.id = id;

      if (movie.nominee) {
        const nominee = await $fetch(`/api/imdb/person/${movie.nominee}`);

        movie.nominee = nominee;
      }
    }

    await $fetch("/api/movie/", {
      method: "POST",
      body: {
        id: movie.id,
      },
    });

    await db.insert(nominations).values({
      awardId: award,
      movieId: typeof movie.id === "number" ? movie.id : parseInt(movie.id),
      oscarId: oscar,
      nomineeId:
        typeof movie.nominee === "number"
          ? movie.nominee
          : movie.nominee === undefined
            ? undefined
            : parseInt(movie.nominee),
      won: movie.won,
    });

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
});
