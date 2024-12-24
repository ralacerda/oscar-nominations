<script setup lang="ts">
const route = useRoute();

const { state } = useQuery({
  key: () => [
    "top-movies",
    route.params.year as string,
    route.params.award as string,
  ],
  query: () =>
    $fetch(`/api/nominations/${route.params.year}/${route.params.award}`),
});
</script>

<template>
  <main>
    <PageTitle>
      {{ awardTitles[$route.params.award as AwardId] }} -
      {{ $route.params.year }}
    </PageTitle>
    <NuxtLink :to="`/oscar-${route.params.year}`">Go Back</NuxtLink>
    <ul>
      <li v-for="nomination in state.data" :key="nomination.id">
        <MovieCard
          :title="nomination.movie.title"
          :original-title="nomination.movie.originalTitle"
          :runtime="nomination.movie.runtime"
          :poster-path="nomination.movie.posterPath"
          :overview="nomination.movie.overview"
          :genres="nomination.movie.genres"
          :nominee="nomination.nominee || undefined"
          :nominations="
            nomination.movie.nominations.map((n) => {
              return {
                nominee: n.nominee ? { name: n.nominee.name } : null,
                award: { title: n.award.title, id: n.award.id },
                won: n.won,
              };
            })
          "
        />
      </li>
    </ul>
  </main>
</template>
