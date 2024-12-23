export default eventHandler(async () => {
  const topMovies: Record<string, string[]> = {};

  const oscars = await $fetch("/api/oscars");

  for (const oscar of oscars.map((oscar) => oscar.id)) {
    const movies = await $fetch(`/api/nominations/${oscar}`, {
      query: { limit: 4 },
    });
    topMovies[oscar] = movies.map((movie) => movie.posterPath);
  }

  return topMovies;
});
