<script setup lang="ts">
const route = useRoute();

useHead({
  title: `Oscar ${route.params.year}`,
});

const { state } = useQuery({
  key: () => ["top-movies", route.params.year as string],
  query: () => $fetch(`/api/nominations/${route.params.year}`),
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});
</script>

<template>
  <main>
    <div v-if="state.status == 'success'">
      <PageTitle>Oscar {{ route.params.year }}</PageTitle>
      <ul>
        <li v-for="movie in state.data" :key="movie.id">
          <MovieCard v-bind="movie" />
        </li>
      </ul>
    </div>
  </main>
</template>

<style lang="scss" scoped>
li + li {
  margin-top: 2rem;
}
</style>
