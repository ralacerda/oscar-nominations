import { movies } from "~~/database/schema/movies";
import type { TMDBMovieWithCredits } from "~~/shared/types/tmdb";

export default eventHandler(
  async (event): Promise<APIResponse<{ id: number }>> => {
    const { id } = await readValidatedBody(event, getValidatedId);
    const key = useRuntimeConfig(event).tmdbAccessToken;
    const client = createTMDbClient(key);

    const check = await db.query.movies.findFirst({
      where: (movies, { eq }) => eq(movies.id, id),
    });

    if (check) {
      return {
        ok: true,
        data: {
          id,
        },
      };
    }

    const result = await client<TMDBMovieWithCredits>(
      `movie/${id.toString()}`,
      {
        query: {
          append_to_response: "credits",
        },
      },
    );

    await db
      .insert(movies)
      .values({
        id: result.id,
        backdropPath: result.backdrop_path,
        originalTitle: result.original_title,
        overview: result.overview,
        posterPath: result.poster_path,
        runtime: result.runtime,
        title: result.title,
        genres: result.genres.map((genre) => genre.name),
        cast: getMainCast(result.credits.cast).map((cast) => ({
          name: cast.name,
          character: cast.character,
          order: cast.order,
          profileImagePath: cast.profile_path,
        })),
        crew: filterCrewJobs(result.credits.crew).map((crew) => ({
          name: crew.name,
          job: crew.job,
          profileImagePath: crew.profile_path,
        })),
      } satisfies Movie)
      .onConflictDoNothing();

    return {
      ok: true,
      data: {
        id,
      },
    };
  },
);

function getMainCast(cast: TMDBMovieWithCredits["credits"]["cast"]) {
  return cast.toSorted((a, b) => b.order - a.order);
}

function filterCrewJobs(crew: TMDBMovieWithCredits["credits"]["crew"]) {
  return crew.filter((crew) =>
    ["Writer", "Director", "Book"].includes(crew.job),
  );
}
