import { awardCategories, oscars } from "~~/database/schema";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Seed awards and years",
  },
  async run() {
    try {
      await db
        .insert(awardCategories)
        .values(seedCategories)
        .onConflictDoNothing();

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
    requiresNominee: false,
  },
  {
    id: "best-director",
    requiresNominee: true,
  },
  {
    id: "best-actor",
    requiresNominee: true,
  },
  {
    id: "best-actress",
    requiresNominee: true,
  },
  {
    id: "best-supporting-actor",
    requiresNominee: true,
  },
  {
    id: "best-supporting-actress",
    requiresNominee: true,
  },
  {
    id: "best-original-screenplay",
    requiresNominee: false,
  },
  {
    id: "best-adapted-screenplay",
    requiresNominee: false,
  },
  {
    id: "best-animated-feature",
    requiresNominee: false,
  },
  {
    id: "best-international-feature",
    requiresNominee: false,
  },
  {
    id: "best-documentary-feature-film",
    requiresNominee: false,
  },
  {
    id: "best-documentary-short-film",
    requiresNominee: false,
  },
  {
    id: "best-live-action-short-film",
    requiresNominee: false,
  },
  {
    id: "best-original-score",
    requiresNominee: false,
  },
  {
    id: "best-original-song",
    requiresNominee: false,
  },
  {
    id: "best-sound",
    requiresNominee: false,
  },
  {
    id: "best-production-design",
    requiresNominee: false,
  },
  {
    id: "best-cinematography",
    requiresNominee: false,
  },
  {
    id: "best-makeup-and-hairstyling",
    requiresNominee: false,
  },
  {
    id: "best-film-editing",
    requiresNominee: false,
  },
  {
    id: "best-visual-effects",
    requiresNominee: false,
  },
  {
    id: "best-costume-design",
    requiresNominee: false,
  },
];
