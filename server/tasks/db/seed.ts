import { oscars } from "~~/database/schema/movies";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Seed years",
  },
  async run() {
    try {
      await db.insert(oscars).values(seedOscars).onConflictDoNothing();
    } catch (error) {
      return { result: "Error", error };
    }
    return { result: "Success" };
  },
});

const seedOscars = [
  {
    id: 2024,
    done: true,
  },
];
