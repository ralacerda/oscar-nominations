import type { oscars } from "~~/database/schema/movies";

export type Oscar = typeof oscars.$inferSelect;
