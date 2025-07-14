import * as z from "zod/v4";
import type { H3Event } from "h3";
import { err, ok, ResultAsync } from "neverthrow";

type InvalidInputError = {
  type: "InvalidInput";
  cause: z.ZodError;
  message: string;
};

type ParsingBodyError = {
  type: "ParsingBody";
  cause: Error;
  body?: unknown;
};

export function validateBody<T>(
  event: H3Event,
  validate: (zod: typeof z) => z.ZodType<T>,
): ResultAsync<T, InvalidInputError | ParsingBodyError> {
  const body = ResultAsync.fromPromise(readBody(event), (e) => ({
    type: "ParsingBody" as const,
    cause: e as Error,
  }));

  const schema = validate(z);

  return body.andThen((data) => {
    const result = schema.safeParse(data);
    if (result.success) {
      return ok(result.data);
    } else {
      return err({
        type: "InvalidInput" as const,
        cause: result.error,
        message: z.prettifyError(result.error),
      });
    }
  });
}
