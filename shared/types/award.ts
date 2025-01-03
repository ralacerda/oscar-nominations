import type { awards } from "~~/database/schema/movies";

export type Award = typeof awards.$inferSelect;
