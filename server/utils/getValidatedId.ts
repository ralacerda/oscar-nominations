import * as v from "valibot";

const IdScheme = v.object({
  id: v.number(),
});

export function getValidatedId(params: unknown): { id: number } {
  return v.parse(IdScheme, params);
}
