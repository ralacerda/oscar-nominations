import * as v from "valibot";
import { nominations } from "~~/database/schema/movies";

const MovieScheme = v.object({
  id: v.union([v.string(), v.number()]),
  nominee: v.optional(v.number()),
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
      const id = await $fetch(`/api/imdb/${movie.id}`);

      movie.id = id;
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
      nomineeId: movie.nominee,
      won: movie.won,
    });

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
});
