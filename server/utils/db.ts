import { drizzle } from "drizzle-orm/libsql";
import * as schema from "~~/database/schema/movies";

export const db = drizzle("file:./database/local.db", {
  schema,
  casing: "snake_case",
});
