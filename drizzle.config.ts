import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './database/drizzle',
  schema: './database/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:./database/local.db',
  },
  casing: 'snake_case',
})
