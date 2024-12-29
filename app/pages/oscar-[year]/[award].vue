<script setup lang="ts">
const route = useRoute();

useHead({
  title: `${awardTitles[route.params.award as AwardId]} - ${route.params.year}`,
});

const { state } = useQuery({
  key: () => [
    "top-movies",
    route.params.year as string,
    route.params.award as string,
  ],
  query: () =>
    $fetch(`/api/nominations/${route.params.year}/${route.params.award}`),
});

const nomineeAward = computed(() => {
  if (!state.value.data) return null;

  return state.value.data.some((n) => n.nominee);
});
</script>

<template>
  <main>
    <PageTitle>
      {{ awardTitles[$route.params.award as AwardId] }} -
      {{ $route.params.year }}
    </PageTitle>
    <NuxtLink :to="`/oscar-${route.params.year}`">Go Back</NuxtLink>
    <ul v-if="nomineeAward" class="nominee-grid">
      <li v-for="nomination in state.data" :key="nomination.id">
        <NomineeCard
          :name="nomination.nominee!.name"
          :profile-image-path="nomination.nominee!.profileImagePath"
          :won="nomination.won"
          :movie="{
            id: nomination.movie.id,
            title: nomination.movie.title,
            originalTitle: nomination.movie.originalTitle,
          }"
        />
      </li>
    </ul>
    <ul v-else class="nominee-grid">
      <li v-for="nomination in state.data" :key="nomination.id">
        <CompactMovieCard
          :id="nomination.movieId"
          :title="nomination.movie.title"
          :original-title="nomination.movie.originalTitle"
          :poster-path="nomination.movie.posterPath"
          :won="nomination.won"
        />
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
.nominee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
}
</style>
