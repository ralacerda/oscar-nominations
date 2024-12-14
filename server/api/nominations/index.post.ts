import * as v from 'valibot'
import { nominations } from '~~/database/schema'

const NominationBodyScheme = v.object({
  award: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  movie: v.number(),
  nominee: v.optional(v.number()),
  oscarId: v.number(),
})

export default eventHandler(async (event) => {
  const { award, movie, nominee, oscarId } = await readValidatedBody(
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
    awardId: award,
    movieId: movie,
    oscarId: oscarId,
    nomineeId: nominee,
  })
})
