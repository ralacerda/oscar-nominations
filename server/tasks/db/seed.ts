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
    personNominated: false,
    title: 'Melhor filme',
  },
  {
    id: 'best-director',
    personNominated: false,
    title: 'Melhor direção',
  },
  {
    id: 'best-actor',
    personNominated: true,
    title: 'Melhor ator',
  },
  {
    id: 'best-actress',
    personNominated: true,
    title: 'Melhor atriz',
  },
  {
    id: 'best-supporting-actor',
    personNominated: true,
    title: 'Melhor ator coadjuvante',
  },
  {
    id: 'best-supporting-actress',
    personNominated: true,
    title: 'Melhor atriz coadjuvante',
  },
  {
    id: 'best-original-screenplay',
    personNominated: false,
    title: 'Melhor roteiro original',
  },
  {
    id: 'best-adapted-screenplay',
    personNominated: false,
    title: 'Melhor roteiro adaptado',
  },
  {
    id: 'best-animated-feature',
    personNominated: false,
    title: 'Melhor filme de animação',
  },
  {
    id: 'best-international-feature',
    personNominated: false,
    title: 'Melhor filme internacional',
  },
  {
    id: 'best-documentary-feature-film',
    personNominated: false,
    title: 'Melhor documentário',
  },
  {
    id: 'best-documentary-short-film',
    personNominated: false,
    title: 'Melhor documentário em curta-metragem',
    short: true,
  },
  {
    id: 'best-live-action-short-film',
    personNominated: false,
    title: 'Melhor curta-metragem em live action',
    short: true,
  },
  {
    id: 'best-original-score',
    personNominated: false,
    title: 'Melhor trilha sonora original',
  },
  {
    id: 'best-original-song',
    personNominated: false,
    title: 'Melhor canção original',
  },
  {
    id: 'best-sound',
    personNominated: false,
    title: 'Melhor som',
  },
  {
    id: 'best-production-design',
    personNominated: false,
    title: 'Melhor direção de arte',
  },
  {
    id: 'best-cinematography',
    personNominated: false,
    title: 'Melhor fotografia',
  },
  {
    id: 'best-makeup-and-hairstyling',
    personNominated: false,
    title: 'Melhor maquiagem e penteados',
  },
  {
    id: 'best-film-editing',
    personNominated: false,
    title: 'Melhor edição',
  },
  {
    id: 'best-visual-effects',
    personNominated: false,
    title: 'Melhores efeitos visuais',
  },
  {
    id: 'best-costume-design',
    personNominated: false,
    title: 'Melhor figurino',
  },
]
