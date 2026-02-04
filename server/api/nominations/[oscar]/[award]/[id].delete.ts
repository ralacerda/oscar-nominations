import { eq } from "drizzle-orm";
import { z } from "zod";
import { nominations } from "~~/database/schema/movies";

const NominationDeleteParams = z.object({
  id: z.coerce.number(),
});

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (data) =>
    NominationDeleteParams.parse(data),
  );

  await db.delete(nominations).where(eq(nominations.id, id));
});
