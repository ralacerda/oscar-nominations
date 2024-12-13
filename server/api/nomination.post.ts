import * as v from "valibot";
import { awardNominations } from "~~/database/schema";

const NominationBodyScheme = v.object({
  category: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  movie: v.number(),
  person: v.optional(v.pipe(v.string(), v.trim())),
  oscarId: v.number(),
});

export default eventHandler(async (event) => {
  const { category, movie, person, oscarId } = await readValidatedBody(
    event,
    (data) => v.parse(NominationBodyScheme, data)
  );

  console.log("Nomination", { category, movie, person, oscarId });

  const res = await $fetch("/api/movie/", {
    method: "POST",
    body: {
      id: movie,
    },
  });

  console.log(res);

  await db.insert(awardNominations).values({
    category_id: category,
    movie_id: movie,
    oscar_id: oscarId,
  });
});
