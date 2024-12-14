import { eq } from 'drizzle-orm'
import * as v from 'valibot'
import { nominations } from '~~/database/schema'

const NominationPatchBodyScheme = v.object({
  nominationId: v.number(),
  won: v.boolean(),
})

export default eventHandler(async (event) => {
  const { nominationId, won } = await readValidatedBody(event, data =>
    v.parse(NominationPatchBodyScheme, data),
  )

  await db
    .update(nominations)
    .set({ won })
    .where(eq(nominations.id, nominationId))
})
