export default function createTMDbClient(key: string) {
  const client = $fetch.create({
    baseURL: "https://api.themoviedb.org/3/movie",
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
    query: {
      language: "pt-BR",
    },
  });

  return client;
}
