import { relations } from "drizzle-orm";
import { int, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { movies } from "./movies";

export const users = sqliteTable(
  "users",
  {
    id: int().primaryKey(),
    // @ts-expect-error - Weird type bug because of the third argument (function to declare unique constraints)
    name: text().notNull(),
    picture: text().notNull(),
    email: text().notNull(),
  },
  (table) => {
    return [
      {
        unq: unique().on(table.email),
      },
    ];
  },
);

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
