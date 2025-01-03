import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./database/drizzle",
  schema: "./database/schema",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:./database/local.db",
  },
  casing: "snake_case",
});
