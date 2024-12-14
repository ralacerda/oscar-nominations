import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '~~/database/schema'

export const db = drizzle('file:./database/local.db', {
  schema,
})
