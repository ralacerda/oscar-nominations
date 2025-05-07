export type FindResponsePerson = {
  person_results: {
    name: string;
    profile_path: string;
  }[];
};

export type FindResponseMovie = {
  movie_results: {
    id: number;
  }[];
};
