<script setup lang="ts">
const route = useRoute();

const { state } = useQuery({
  key: () => ["top-movies", route.params.year as string],
  query: () => $fetch(`/api/nominations/${route.params.year}`),
});
</script>

<template>
  <main>
    <div v-if="state.status == 'success'">
      <h1>Top Movies {{ route.params.year }}</h1>
      <ul>
        <li v-for="movie in state.data" :key="movie.id">
          <MovieCard v-bind="movie" />
        </li>
      </ul>
    </div>
  </main>
</template>
