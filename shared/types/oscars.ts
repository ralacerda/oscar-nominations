import type { oscars } from "~~/database/schema";

export type Oscar = typeof oscars.$inferSelect;
