import { drizzle } from "drizzle-orm/libsql";
import * as moviesSchema from "~~/database/schema/movies";
import * as usersSchema from "~~/database/schema/users";

export const db = drizzle("file:./database/local.db", {
  schema: {
    ...moviesSchema,
    ...usersSchema,
  },
  casing: "snake_case",
});
