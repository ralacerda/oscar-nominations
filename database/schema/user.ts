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

export const movieStatus = sqliteTable("movie_status", {
  id: int().primaryKey(),
  userId: int()
    .notNull()
    .references(() => users.id),
  movieId: int()
    .notNull()
    .references(() => movies.id),
  status: text({ enum: ["watchlist", "watched", "recommended"] }).notNull(),
});

export const movieStatusRelation = relations(movieStatus, ({ one }) => ({
  user: one(users, {
    fields: [movieStatus.userId],
    references: [users.id],
  }),
  movie: one(movies, {
    fields: [movieStatus.movieId],
    references: [movies.id],
  }),
}));

export const userRelation = relations(users, ({ many }) => ({
  movieStatus: many(movieStatus),
}));
