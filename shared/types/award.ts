import type { awards } from "~~/database/schema";

export type Award = typeof awards.$inferSelect;
