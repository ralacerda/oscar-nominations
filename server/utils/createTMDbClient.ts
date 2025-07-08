import { $fetch } from "ofetch";

export const TMDbClient = $fetch.create({
  baseURL: "https://api.themoviedb.org/3/",
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
  query: {
    language: "pt-BR",
  },
});
