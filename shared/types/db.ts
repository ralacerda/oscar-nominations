import type { movies, awards } from '~~/database/schema'

export type Movie = typeof movies.$inferSelect
export type Award = typeof awards.$inferSelect
