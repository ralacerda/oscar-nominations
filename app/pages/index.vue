<script setup lang="ts">
const { state } = useQuery({
  key: ["top-movies"],
  query: () => $fetch("/api/movie/2024"),
});
</script>

<template>
  <main>
    <div v-if="state.status == 'success'">
      <h1>Top Movies</h1>
      <ul>
        <li v-for="movie in state.data" :key="movie.id">
          <MovieCard v-bind="movie" />
        </li>
      </ul>
    </div>
  </main>
</template>
