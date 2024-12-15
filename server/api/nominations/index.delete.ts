import { eq } from "drizzle-orm";
import * as v from "valibot";
import { nominations } from "~~/database/schema";

const NominationDeleteBodyScheme = v.object({
  nominationId: v.number(),
});

export default eventHandler(async (event) => {
  const { nominationId } = await readValidatedBody(event, (data) =>
    v.parse(NominationDeleteBodyScheme, data),
  );

  await db.delete(nominations).where(eq(nominations.id, nominationId));
});
