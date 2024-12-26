<script setup lang="ts">
const route = useRoute();

const { data: movie, error } = useFetch(
  `/api/movies/${route.params.id as string}`,
);
</script>

<template>
  <main>
    {{ error }}
    {{ movie }}
    <ul v-if="movie">
      <li v-for="crew in movie.crew" :key="crew.id">
        {{ crew.personId }} - {{ crew.job }}
      </li>
    </ul>
  </main>
</template>
