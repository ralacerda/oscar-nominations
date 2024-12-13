import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// People and Movies (Core tables)
export const people = sqliteTable("people_table", {
  id: int().primaryKey(),
  name: text().notNull(),
  profile_path: text(),
});

export const movies = sqliteTable("movies_table", {
  id: int().primaryKey(),
  backdrop_path: text().notNull(),
  imdb_id: text().notNull().unique(),
  original_title: text().notNull(),
  overview: text().notNull(),
  poster_path: text().notNull(),
  runtime: int().notNull(),
  title: text().notNull(),
  genres: text().notNull(),
});

export const moviesRelation = relations(movies, ({ many }) => ({
  nominations: many(awardNominations),
  cast: many(castCredits),
  crew: many(crewCredits),
}));

// Credits
export const castCredits = sqliteTable("cast_credits", {
  id: int().primaryKey(),
  person_id: int()
    .notNull()
    .references(() => people.id),
  movie_id: int()
    .notNull()
    .references(() => movies.id),
  character: text().notNull(),
  order: int().notNull(),
});

export const castCreditsRelation = relations(castCredits, ({ one }) => ({
  person: one(people, {
    fields: [castCredits.person_id],
    references: [people.id],
  }),
  movie: one(movies, {
    fields: [castCredits.movie_id],
    references: [movies.id],
  }),
}));

export const crewCredits = sqliteTable("crew_credits", {
  id: int().primaryKey(),
  person_id: int()
    .notNull()
    .references(() => people.id),
  movie_id: int()
    .notNull()
    .references(() => movies.id),
  department: text().notNull(),
});

export const crewCreditsRelation = relations(crewCredits, ({ one }) => ({
  person: one(people, {
    fields: [crewCredits.person_id],
    references: [people.id],
  }),
  movie: one(movies, {
    fields: [crewCredits.movie_id],
    references: [movies.id],
  }),
}));

// Awards and Nominations
export const oscars = sqliteTable("oscars_table", {
  id: int().primaryKey(),
  year: text().notNull().unique(),
  done: int({ mode: "boolean" }).notNull().default(false),
});

export const awardCategories = sqliteTable("award_categories", {
  id: text().primaryKey(),
  requiresNominee: int({ mode: "boolean" }).notNull().default(false),
});

export const awardNominations = sqliteTable("award_nominations", {
  id: int().primaryKey(),
  oscar_id: int()
    .notNull()
    .references(() => oscars.id),
  category_id: text()
    .notNull()
    .references(() => awardCategories.id),
  movie_id: int()
    .notNull()
    .references(() => movies.id),
  nominees_id: int(),
  won: int({ mode: "boolean" }).notNull().default(false),
});

export const awardNominees = sqliteTable("award_nominees", {
  id: int().primaryKey(),
  person_id: int().notNull(),
  nomination_id: int()
    .notNull()
    .references(() => awardNominations.id),
});

export const awardNominationsRelation = relations(
  awardNominations,
  ({ one, many }) => ({
    movie: one(movies, {
      fields: [awardNominations.movie_id],
      references: [movies.id],
    }),
    category: one(awardCategories, {
      fields: [awardNominations.category_id],
      references: [awardCategories.id],
    }),
    nominees: many(awardNominees),
  })
);

export const awardNomineesRelation = relations(awardNominees, ({ one }) => ({
  nomination: one(awardNominations, {
    fields: [awardNominees.nomination_id],
    references: [awardNominations.id],
  }),
}));
