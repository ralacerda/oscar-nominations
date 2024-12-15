import { eq } from "drizzle-orm";
import * as v from "valibot";
import { nominations } from "~~/database/schema";

const NominationPatchBodyScheme = v.object({
  won: v.boolean(),
});

const NominationPatchParams = v.object({
  id: v.pipe(v.string(), v.transform(Number)),
});

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (data) =>
    v.parse(NominationPatchParams, data),
  );

  const { won } = await readValidatedBody(event, (data) =>
    v.parse(NominationPatchBodyScheme, data),
  );

  await db.update(nominations).set({ won }).where(eq(nominations.id, id));
});
