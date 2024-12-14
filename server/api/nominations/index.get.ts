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

  return await db.query.nominations.findMany({
    where: (nomineers, { eq, and }) => and(eq(nomineers.awardId, category), eq(nomineers.oscarId, oscarId)),
    with: {
      movie: true,
      nominee: true,
    },
    columns: {
      movieId: true,
      won: true,
    },
  })
})
