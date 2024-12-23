<script setup lang="ts">
const route = useRoute();

const { data: movies } = await useFetch(
  `/api/nominations/${route.params.year}/${route.params.award}`,
);
</script>

<template>
  <div>
    <h1>Olá</h1>
    <NuxtLink :to="`/oscar-${route.params.year}`">Go Back</NuxtLink>
    <pre>{{ movies }}</pre>
  </div>
</template>
