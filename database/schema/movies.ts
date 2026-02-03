import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// People and Movies (Core tables)
export const people = sqliteTable("people_table", {
  id: int().primaryKey(),
  name: text().notNull(),
  profileImagePath: text(),
});

export const movies = sqliteTable("movies_table", {
  id: int().primaryKey(),
  backdropPath: text(),
  originalTitle: text().notNull(),
  overview: text(),
  posterPath: text().notNull(),
  runtime: int().notNull(),
  title: text().notNull(),
  genres: text().notNull(),
});

export const moviesRelation = relations(movies, ({ many }) => ({
  nominations: many(nominations),
  cast: many(castCredits),
  crew: many(crewCredits),
}));

// Credits
export const castCredits = sqliteTable("cast_credits", {
  id: int().primaryKey(),
  personId: int()
    .notNull()
    .references(() => people.id),
  movieId: int()
    .notNull()
    .references(() => movies.id),
  character: text().notNull(),
  order: int().notNull(),
});

export const castCreditsRelation = relations(castCredits, ({ one }) => ({
  person: one(people, {
    fields: [castCredits.personId],
    references: [people.id],
  }),
  movie: one(movies, {
    fields: [castCredits.movieId],
    references: [movies.id],
  }),
}));

export const crewCredits = sqliteTable("crew_credits", {
  id: int().primaryKey(),
  personId: int()
    .notNull()
    .references(() => people.id),
  movieId: int()
    .notNull()
    .references(() => movies.id),
  job: text().notNull(),
});

export const crewCreditsRelation = relations(crewCredits, ({ one }) => ({
  person: one(people, {
    fields: [crewCredits.personId],
    references: [people.id],
  }),
  movie: one(movies, {
    fields: [crewCredits.movieId],
    references: [movies.id],
  }),
}));

// Awards and Nominations
export const oscars = sqliteTable("oscars_table", {
  id: int().primaryKey(),
  done: int({ mode: "boolean" }).notNull().default(false),
});

export const awards = sqliteTable("awards_table", {
  id: text().primaryKey(),
  title: text().notNull(),
  short: int({ mode: "boolean" }).notNull().default(false),
  requiresNominee: int({ mode: "boolean" }).notNull().default(false),
});

export const nominations = sqliteTable("nominations_table", {
  id: int().primaryKey(),
  oscarId: int()
    .notNull()
    .references(() => oscars.id),
  awardId: text()
    .notNull()
    .references(() => awards.id),
  movieId: int()
    .notNull()
    .references(() => movies.id),
  nomineeId: int(),
  won: int({ mode: "boolean" }).notNull().default(false),
});

export const nominationsRelations = relations(nominations, ({ one }) => ({
  movie: one(movies, {
    fields: [nominations.movieId],
    references: [movies.id],
  }),
  award: one(awards, {
    fields: [nominations.awardId],
    references: [awards.id],
  }),
  nominee: one(people, {
    fields: [nominations.nomineeId],
    references: [people.id],
  }),
}));
