import { type ZodError, prettifyError } from "zod/v4";
import { err } from "neverthrow";

export type SystemError =
  | InvalidInputError
  | ParsingBodyError
  | DatabaseError
  | DatabaseNoRowEffectedError;

export type InvalidInputError = {
  type: "InvalidInput";
  cause: ZodError;
  message: string;
};

export function createInvalidInputError(cause: ZodError) {
  return err({
    type: "InvalidInput",
    cause,
    message: prettifyError(cause),
  });
}

export type ParsingBodyError = {
  type: "ParsingBody";
  cause: Error;
  body?: unknown;
};

export function createParsingBodyError(cause: Error, body?: unknown) {
  return err({
    type: "ParsingBody",
    cause,
    body,
  });
}

export type DatabaseError = {
  type: "DatabaseError";
  cause: Error;
};

export function createDatabaseError(cause: Error) {
  return err({
    type: "DatabaseError",
    cause,
  });
}

export type DatabaseNoRowEffectedError = {
  type: "DatabaseNoRowEffectedError";
  message: string;
};

export function createDatabaseNoRowEffectedError(message: string) {
  return err({
    type: "DatabaseNoRowEffectedError",
    message,
  });
}
