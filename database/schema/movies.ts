import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export interface Person {
  name: string;
  profileImagePath?: string;
}

export interface CastMember extends Person {
  character: string;
}

export interface CrewMember extends Person {
  job: string;
}

export const movies = sqliteTable("movies_table", {
  id: int().primaryKey(),
  backdropPath: text().notNull(),
  originalTitle: text().notNull(),
  overview: text(),
  posterPath: text().notNull(),
  runtime: int().notNull(),
  title: text().notNull(),
  genres: text({ mode: "json" }).$type<string[]>().notNull(),
  cast: text({ mode: "json" }).$type<CastMember[]>().notNull(),
  crew: text({ mode: "json" }).$type<CrewMember[]>().notNull(),
});

export const moviesRelation = relations(movies, ({ many }) => ({
  nominations: many(nominations),
}));

// Awards and Nominations
export const oscars = sqliteTable("oscars_table", {
  id: int().primaryKey(),
  done: int({ mode: "boolean" }).notNull().default(false),
});

export const nominations = sqliteTable("nominations_table", {
  id: int().primaryKey(),
  oscarId: int()
    .notNull()
    .references(() => oscars.id),
  awardId: text({ mode: "json" }).$type<keyof typeof awardsInfo>().notNull(),
  movieId: int()
    .notNull()
    .references(() => movies.id),
  nominee: text({ mode: "json" }).$type<Person>(),
  won: int({ mode: "boolean" }).notNull().default(false),
});

export const nominationsRelations = relations(nominations, ({ one }) => ({
  movie: one(movies, {
    fields: [nominations.movieId],
    references: [movies.id],
  }),
}));
