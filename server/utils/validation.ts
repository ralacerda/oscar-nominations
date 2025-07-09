import * as z from "zod/v4";
import type { H3Event } from "h3";
import { err, ok, ResultAsync } from "neverthrow";

export function validateBody<T>(
  event: H3Event,
  validate: (zod: typeof z) => z.ZodType<T>,
): ResultAsync<T, InvalidInputError | ParsingBodyError> {
  const body = ResultAsync.fromPromise(
    readBody(event),
    (e) => new ParsingBodyError(e),
  );

  const schema = validate(z);

  return body.andThen((data) => {
    const result = schema.safeParse(data);
    if (result.success) {
      return ok(result.data);
    } else {
      return err(new InvalidInputError(result.error));
    }
  });
}
