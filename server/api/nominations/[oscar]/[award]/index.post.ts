import { z } from "zod";
import { nominations } from "~~/database/schema/movies";

const MovieScheme = z.object({
  id: z.union([z.string(), z.number()]),
  nominee: z.union([z.string(), z.number(), z.undefined()]).optional(),
  won: z.boolean().optional(),
  imdbCode: z.boolean().optional(),
});

const NominationBodyScheme = z.union([z.array(MovieScheme), MovieScheme]);

const NominationParams = z.object({
  oscar: z.coerce.number(),
  award: z.string().trim().min(1),
});

export default eventHandler(async (event) => {
  const _movies = await readValidatedBody(event, (data) =>
    NominationBodyScheme.parse(data),
  );

  const movies = Array.isArray(_movies) ? _movies : [_movies];

  const { oscar, award } = await getValidatedRouterParams(event, (data) =>
    NominationParams.parse(data),
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
