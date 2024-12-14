import * as v from 'valibot'

const NominationQueryScheme = v.object({
  category: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  oscarId: v.pipe(v.string(), v.transform(Number)),
})

export default eventHandler(async (event) => {
  const { category, oscarId } = await getValidatedQuery(
    event,
    data => v.parse(NominationQueryScheme, data),
  )

  const nominations = await db.query.nominations.findMany({
    where: (nomineers, { eq, and }) => and(eq(nomineers.category_id, category), eq(nomineers.oscar_id, oscarId)),
    with: {
      movie: true,
      nominee: true,
    },
    columns: {
      movie_id: true,
      won: true,
    },
  })

  return nominations.map(({ movie, movie_id, won, nominee }) => {
    return {
      title: movie.title,
      nominee: nominee?.name,
      id: movie_id,
      won,
    }
  })
})
