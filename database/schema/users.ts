import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { movies } from "./movies";

export const users = sqliteTable("users", {
  id: int().primaryKey(),
  name: text().notNull(),
  picture: text().notNull(),
  email: text().notNull().unique(),
});

export const watchlist = sqliteTable("watchlist", {
  id: int().primaryKey(),
  userId: int()
    .notNull()
    .references(() => users.id),
  movieId: int()
    .notNull()
    .references(() => movies.id),
});

export const watchlistRelation = relations(watchlist, ({ one }) => ({
  user: one(users, {
    fields: [watchlist.userId],
    references: [users.id],
  }),
  movie: one(movies, {
    fields: [watchlist.movieId],
    references: [movies.id],
  }),
}));
