export function useExample() {
  const { data } = useFetch("/api/movies/", {
    method: "POST",
    body: {
      id: "tt1234567",
    },
  });

  return data;
}
