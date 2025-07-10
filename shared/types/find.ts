export type PersonInfo = {
  name: string;
  profile_path: string;
  gender: number;
};

export type FindResponsePerson = {
  person_results: PersonInfo[];
};

export type FindResponseMovie = {
  movie_results: {
    id: number;
  }[];
};
