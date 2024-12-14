import * as v from 'valibot'
import { nominations } from '~~/database/schema'

const NominationBodyScheme = v.object({
  // TODO: Mudar category para award
  category: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  movie: v.number(),
  person: v.optional(v.number()),
  oscarId: v.number(),
})

export default eventHandler(async (event) => {
  const { category, movie, person, oscarId } = await readValidatedBody(
    event,
    data => v.parse(NominationBodyScheme, data),
  )

  await $fetch('/api/movie/', {
    method: 'POST',
    body: {
      id: movie,
    },
  })

  await db.insert(nominations).values({
    categoryId: category,
    movieId: movie,
    oscarId: oscarId,
    nomineesId: person,
  })
})
