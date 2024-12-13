import * as v from "valibot";

const IdScheme = v.object({
  id: v.pipe(v.string(), v.transform(Number), v.number()),
});

export function getValidatedId(params: unknown): { id: number } {
  return v.parse(IdScheme, params);
}
