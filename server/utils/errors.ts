import type { ZodError } from "zod/v4";

export class InvalidInputError extends Error {
  readonly type = "InvalidInput" as const;
  cause: ZodError;

  constructor(cause: ZodError) {
    super("Invalid input provided");
    this.name = "InvalidInputError";
    this.cause = cause;
  }
}

export class ParsingBodyError extends Error {
  readonly type = "ParsingBody" as const;
  cause: unknown;

  constructor(cause: unknown) {
    super("Error validating body");
    this.name = "InvalidInputError";
    this.cause = cause;
  }
}

export class DatabaseError extends Error {
  readonly type = "DatabaseError" as const;
  cause: unknown;

  constructor(cause: unknown) {
    super("Database operation failed");
    this.name = "DatabaseError";
    this.cause = cause;
  }
}
