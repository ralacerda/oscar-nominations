import { eq } from "drizzle-orm";
import * as v from "valibot";
import { nominations } from "~~/database/schema";

const NominationDeleteParams = v.object({
  id: v.pipe(v.string(), v.transform(Number)),
});

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (data) =>
    v.parse(NominationDeleteParams, data),
  );

  await db.delete(nominations).where(eq(nominations.id, id));
});
