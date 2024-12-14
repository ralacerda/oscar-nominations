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
    id: 2024,
    done: true,
  },
];

const seedCategories = [
  {
    id: "best-picture",
    person_nominated: false,
    title: "Melhor filme",
  },
  {
    id: "best-director",
    person_nominated: false,
    title: "Melhor direção",
  },
  {
    id: "best-actor",
    person_nominated: true,
    title: "Melhor ator",
  },
  {
    id: "best-actress",
    person_nominated: true,
    title: "Melhor atriz",
  },
  {
    id: "best-supporting-actor",
    person_nominated: true,
    title: "Melhor ator coadjuvante",
  },
  {
    id: "best-supporting-actress",
    person_nominated: true,
    title: "Melhor atriz coadjuvante",
  },
  {
    id: "best-original-screenplay",
    person_nominated: false,
    title: "Melhor roteiro original",
  },
  {
    id: "best-adapted-screenplay",
    person_nominated: false,
    title: "Melhor roteiro adaptado",
  },
  {
    id: "best-animated-feature",
    person_nominated: false,
    title: "Melhor filme de animação",
  },
  {
    id: "best-international-feature",
    person_nominated: false,
    title: "Melhor filme internacional",
  },
  {
    id: "best-documentary-feature-film",
    person_nominated: false,
    title: "Melhor documentário",
  },
  {
    id: "best-documentary-short-film",
    person_nominated: false,
    title: "Melhor documentário em curta-metragem",
    short: true,
  },
  {
    id: "best-live-action-short-film",
    person_nominated: false,
    title: "Melhor curta-metragem em live action",
    short: true,
  },
  {
    id: "best-original-score",
    person_nominated: false,
    title: "Melhor trilha sonora original",
  },
  {
    id: "best-original-song",
    person_nominated: false,
    title: "Melhor canção original",
  },
  {
    id: "best-sound",
    person_nominated: false,
    title: "Melhor som",
  },
  {
    id: "best-production-design",
    person_nominated: false,
    title: "Melhor direção de arte",
  },
  {
    id: "best-cinematography",
    person_nominated: false,
    title: "Melhor fotografia",
  },
  {
    id: "best-makeup-and-hairstyling",
    person_nominated: false,
    title: "Melhor maquiagem e penteados",
  },
  {
    id: "best-film-editing",
    person_nominated: false,
    title: "Melhor edição",
  },
  {
    id: "best-visual-effects",
    person_nominated: false,
    title: "Melhores efeitos visuais",
  },
  {
    id: "best-costume-design",
    person_nominated: false,
    title: "Melhor figurino",
  },
];
