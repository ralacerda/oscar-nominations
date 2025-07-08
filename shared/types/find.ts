export type FindResponsePerson = {
  person_results: {
    name: string;
    profile_path: string;
    gender: number;
  }[];
};

export type FindResponseMovie = {
  movie_results: {
    id: number;
  }[];
};
