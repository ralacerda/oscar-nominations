import { awards, oscars } from "~~/database/schema";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Seed awards and years",
  },
  async run() {
    try {
      await db.insert(awards).values(seedCategories).onConflictDoNothing();

      await db.insert(oscars).values(seedOscars).onConflictDoNothing();
    } catch (error) {
      return { result: "Error", error };
    }
    return { result: "Success" };
  },
});

const seedOscars = [
  {
    year: "2024",
    done: true,
  },
];

const seedCategories = [
  {
    id: "best-picture",
    person_nominated: false,
  },
  {
    id: "best-director",
    person_nominated: false,
  },
  {
    id: "best-actor",
    person_nominated: true,
  },
  {
    id: "best-actress",
    person_nominated: true,
  },
  {
    id: "best-supporting-actor",
    person_nominated: true,
  },
  {
    id: "best-supporting-actress",
    person_nominated: true,
  },
  {
    id: "best-original-screenplay",
    person_nominated: false,
  },
  {
    id: "best-adapted-screenplay",
    person_nominated: false,
  },
  {
    id: "best-animated-feature",
    person_nominated: false,
  },
  {
    id: "best-international-feature",
    person_nominated: false,
  },
  {
    id: "best-documentary-feature-film",
    person_nominated: false,
  },
  {
    id: "best-documentary-short-film",
    person_nominated: false,
  },
  {
    id: "best-live-action-short-film",
    person_nominated: false,
  },
  {
    id: "best-original-score",
    person_nominated: false,
  },
  {
    id: "best-original-song",
    person_nominated: false,
  },
  {
    id: "best-sound",
    person_nominated: false,
  },
  {
    id: "best-production-design",
    person_nominated: false,
  },
  {
    id: "best-cinematography",
    person_nominated: false,
  },
  {
    id: "best-makeup-and-hairstyling",
    person_nominated: false,
  },
  {
    id: "best-film-editing",
    person_nominated: false,
  },
  {
    id: "best-visual-effects",
    person_nominated: false,
  },
  {
    id: "best-costume-design",
    person_nominated: false,
  },
];
