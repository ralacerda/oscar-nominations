import { awards, oscars } from '~~/database/schema'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Seed awards and years',
  },
  async run() {
    try {
      await db.insert(awards).values(seedCategories).onConflictDoNothing()

      await db.insert(oscars).values(seedOscars).onConflictDoNothing()
    }
    catch (error) {
      return { result: 'Error', error }
    }
    return { result: 'Success' }
  },
})

const seedOscars = [
  {
    id: 2024,
    done: true,
  },
]

const seedCategories = [
  {
    id: 'best-picture',
    requiresNominee: false,
    title: 'Melhor filme',
  },
  {
    id: 'best-director',
    requiresNominee: false,
    title: 'Melhor direção',
  },
  {
    id: 'best-actor',
    requiresNominee: true,
    title: 'Melhor ator',
  },
  {
    id: 'best-actress',
    requiresNominee: true,
    title: 'Melhor atriz',
  },
  {
    id: 'best-supporting-actor',
    requiresNominee: true,
    title: 'Melhor ator coadjuvante',
  },
  {
    id: 'best-supporting-actress',
    requiresNominee: true,
    title: 'Melhor atriz coadjuvante',
  },
  {
    id: 'best-original-screenplay',
    requiresNominee: false,
    title: 'Melhor roteiro original',
  },
  {
    id: 'best-adapted-screenplay',
    requiresNominee: false,
    title: 'Melhor roteiro adaptado',
  },
  {
    id: 'best-animated-feature',
    requiresNominee: false,
    title: 'Melhor filme de animação',
  },
  {
    id: 'best-international-feature',
    requiresNominee: false,
    title: 'Melhor filme internacional',
  },
  {
    id: 'best-documentary-feature-film',
    requiresNominee: false,
    title: 'Melhor documentário',
  },
  {
    id: 'best-documentary-short-film',
    requiresNominee: false,
    title: 'Melhor documentário em curta-metragem',
    short: true,
  },
  {
    id: 'best-live-action-short-film',
    requiresNominee: false,
    title: 'Melhor curta-metragem em live action',
    short: true,
  },
  {
    id: 'best-original-score',
    requiresNominee: false,
    title: 'Melhor trilha sonora original',
  },
  {
    id: 'best-original-song',
    requiresNominee: false,
    title: 'Melhor canção original',
  },
  {
    id: 'best-sound',
    requiresNominee: false,
    title: 'Melhor som',
  },
  {
    id: 'best-production-design',
    requiresNominee: false,
    title: 'Melhor direção de arte',
  },
  {
    id: 'best-cinematography',
    requiresNominee: false,
    title: 'Melhor fotografia',
  },
  {
    id: 'best-makeup-and-hairstyling',
    requiresNominee: false,
    title: 'Melhor maquiagem e penteados',
  },
  {
    id: 'best-film-editing',
    requiresNominee: false,
    title: 'Melhor edição',
  },
  {
    id: 'best-visual-effects',
    requiresNominee: false,
    title: 'Melhores efeitos visuais',
  },
  {
    id: 'best-costume-design',
    requiresNominee: false,
    title: 'Melhor figurino',
  },
]
