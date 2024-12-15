import { castCredits, crewCredits, movies, people } from "~~/database/schema";

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

    const result = await client<TMDBMovieWithCredits>(id.toString(), {
      query: {
        append_to_response: "credits",
      },
    });

    await db
      .insert(movies)
      .values({
        id: id,
        backdropPath: result.backdrop_path,
        originalTitle: result.original_title,
        overview: result.overview,
        posterPath: result.poster_path,
        runtime: result.runtime,
        title: result.title,
        genres: result.genres.map((genre) => genre.name).join(", "),
      })
      .onConflictDoNothing();

    await db
      .insert(people)
      .values(
        result.credits.cast.map((cast) => ({
          id: cast.id,
          name: cast.name,
          profileImagePath: cast.profile_path,
        })),
      )
      .onConflictDoNothing();

    await db
      .insert(people)
      .values(
        result.credits.crew.map((crew) => ({
          id: crew.id,
          name: crew.name,
          profileImagePath: crew.profile_path,
        })),
      )
      .onConflictDoNothing();

    await db
      .insert(castCredits)
      .values(
        result.credits.cast.map((cast) => ({
          personId: cast.id,
          character: cast.character,
          order: cast.order,
          movieId: id,
        })),
      )
      .onConflictDoNothing();

    await db
      .insert(crewCredits)
      .values(
        result.credits.crew.map((crew) => ({
          personId: crew.id,
          department: crew.department,
          movieId: id,
        })),
      )
      .onConflictDoNothing();

    return {
      ok: true,
      data: {
        id,
      },
    };
  },
);
