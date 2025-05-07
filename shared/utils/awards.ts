export const awardsInfo = {
  "best-picture": { title: "Melhor filme" },
  "best-director": { title: "Melhor direção", requiresNominee: false },
  "best-actor": { title: "Melhor ator", requiresNominee: true },
  "best-actress": { title: "Melhor atriz", requiresNominee: true },
  "best-supporting-actor": {
    title: "Melhor ator coadjuvante",
    requiresNominee: true,
  },
  "best-supporting-actress": {
    title: "Melhor atriz coadjuvante",
    requiresNominee: true,
  },
  "best-original-screenplay": {
    title: "Melhor roteiro original",
    requiresNominee: false,
  },
  "best-adapted-screenplay": {
    title: "Melhor roteiro adaptado",
    requiresNominee: false,
  },
  "best-animated-feature": {
    title: "Melhor filme de animação",
    requiresNominee: false,
  },
  "best-international-feature": {
    title: "Melhor filme internacional",
    requiresNominee: false,
  },
  "best-documentary-feature-film": {
    title: "Melhor documentário",
    requiresNominee: false,
  },
  "best-documentary-short-film": {
    title: "Melhor documentário em curta-metragem",
    requiresNominee: false,
  },
  "best-live-action-short-film": {
    title: "Melhor curta-metragem em live action",
    requiresNominee: false,
  },
  "best-original-score": {
    title: "Melhor trilha sonora original",
    requiresNominee: false,
  },
  "best-original-song": {
    title: "Melhor canção original",
    requiresNominee: false,
  },
  "best-sound": { title: "Melhor som", requiresNominee: false },
  "best-production-design": {
    title: "Melhor direção de arte",
    requiresNominee: false,
  },
  "best-cinematography": { title: "Melhor fotografia", requiresNominee: false },
  "best-makeup-and-hairstyling": {
    title: "Melhor maquiagem e penteados",
    requiresNominee: false,
  },
  "best-film-editing": { title: "Melhor edição", requiresNominee: false },
  "best-visual-effects": {
    title: "Melhores efeitos visuais",
    requiresNominee: false,
  },
  "best-costume-design": { title: "Melhor figurino", requiresNominee: false },
} as const;

export const awardsKeys = Object.keys(
  awardsInfo,
) as (keyof typeof awardsInfo)[];
