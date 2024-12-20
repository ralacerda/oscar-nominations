import type { movies, nominations } from "~~/database/schema";

export type Movie = typeof movies.$inferSelect;
export type Nomination = typeof nominations.$inferSelect;
