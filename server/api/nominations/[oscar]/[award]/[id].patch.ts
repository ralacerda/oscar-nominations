import { eq } from "drizzle-orm";
import { z } from "zod";
import { nominations } from "~~/database/schema/movies";

const NominationPatchBodyScheme = z.object({
  won: z.boolean(),
});

const NominationPatchParams = z.object({
  id: z.coerce.number(),
});

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (data) =>
    NominationPatchParams.parse(data),
  );

  const { won } = await readValidatedBody(event, (data) =>
    NominationPatchBodyScheme.parse(data),
  );

  await db.update(nominations).set({ won }).where(eq(nominations.id, id));
});
