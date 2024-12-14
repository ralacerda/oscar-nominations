import * as v from "valibot";
import { nominations } from "~~/database/schema";

const NominationBodyScheme = v.object({
  category: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  movie: v.number(),
  person: v.optional(v.number()),
  oscarId: v.number(),
});

export default eventHandler(async (event) => {
  const { category, movie, person, oscarId } = await readValidatedBody(
    event,
    (data) => v.parse(NominationBodyScheme, data)
  );

  await $fetch("/api/movie/", {
    method: "POST",
    body: {
      id: movie,
    },
  });

  await db.insert(nominations).values({
    category_id: category,
    movie_id: movie,
    oscar_id: oscarId,
    nominees_id: person,
  });
});
