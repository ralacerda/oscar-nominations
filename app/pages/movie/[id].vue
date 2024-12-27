<script setup lang="ts">
const route = useRoute();

const { data: movie, error } = useFetch(
  `/api/movies/${route.params.id as string}`,
);

const { data: providers } = useFetch(
  `/api/movies/${route.params.id as string}/providers`,
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
    <pre>
      {{ providers }}
    </pre>
  </main>
</template>
