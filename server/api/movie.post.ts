import { castCredits, crewCredits, movies, people } from '~~/database/schema'

export default eventHandler(
  async (event): Promise<APIResponse<{ id: number }>> => {
    const { id } = await readValidatedBody(event, getValidatedId)
    const key = useRuntimeConfig(event).tmdbAccessToken
    const client = createTMDbClient(key)

    const check = await db.query.movies.findFirst({
      where: (movies, { eq }) => eq(movies.id, id),
    })

    if (check) {
      return {
        ok: true,
        data: {
          id,
        },
      }
    }

    const result = await client<TMDBMovieWithCredits>(id.toString(), {
      query: {
        append_to_response: 'credits',
      },
    })

    await db
      .insert(movies)
      .values({
        id: id,
        backdrop_path: result.backdrop_path,
        imdb_id: result.imdb_id,
        original_title: result.original_title,
        overview: result.overview,
        poster_path: result.poster_path,
        runtime: result.runtime,
        title: result.title,
        genres: result.genres.map(genre => genre.name).join(', '),
      })
      .onConflictDoNothing()

    await db
      .insert(people)
      .values(
        result.credits.cast.map(cast => ({
          id: cast.id,
          name: cast.name,
          profile_path: cast.profile_path,
        })),
      )
      .onConflictDoNothing()

    await db
      .insert(people)
      .values(
        result.credits.crew.map(crew => ({
          id: crew.id,
          name: crew.name,
          profile_path: crew.profile_path,
        })),
      )
      .onConflictDoNothing()

    await db
      .insert(castCredits)
      .values(
        result.credits.cast.map(cast => ({
          person_id: cast.id,
          character: cast.character,
          order: cast.order,
          movie_id: id,
        })),
      )
      .onConflictDoNothing()

    await db
      .insert(crewCredits)
      .values(
        result.credits.crew.map(crew => ({
          person_id: crew.id,
          department: crew.department,
          movie_id: id,
        })),
      )
      .onConflictDoNothing()

    return {
      ok: true,
      data: {
        id,
      },
    }
  },
)
