import { z } from "zod";

const IdScheme = z.object({
  id: z.number(),
});

export function getValidatedId(params: unknown): { id: number } {
  return IdScheme.parse(params);
}
