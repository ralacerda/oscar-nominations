import * as v from "valibot";
import type { Person } from "~~/database/schema/movies";
import { nominations } from "~~/database/schema/movies";

const MovieScheme = v.object({
  source: v.union([v.literal("imdb"), v.literal("tmdb")]),
  nomineeCode: v.optional(v.string()),
  won: v.optional(v.boolean()),
  movieCode: v.string(),
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
    let movieId: string;

    if (movie.source === "tmdb") {
      movieId = await $fetch(`/api/imdb/movie/${movie.movieCode}`);
    } else {
      movieId = movie.movieCode;
    }

    let nominee: Person;

    if (movie.nomineeCode) {
      if (movie.source === "imdb") {
        nominee = await $fetch(`/api/imdb/person/${movie.nomineeCode}`);
      } else {
        nominee = await $fetch(`/api/person/${movie.nomineeCode}`);
      }
    }

    await $fetch("/api/movie/", {
      method: "POST",
      body: {
        movieId,
      },
    });

    await db.insert(nominations).values({
      movieId: Number(movieId),
      oscarId: oscar,
      awardId: award,
      nominee: nominee,
      won: movie.won,
    });

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
});
