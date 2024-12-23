<script setup lang="ts">
const { data: posters } = useFetch("/api/oscars/posters");
</script>

<template>
  <div>
    <pre
      v-for="(poster, oscar) in posters"
      :key="oscar"
    ><NuxtLink :to="`/oscar-${oscar}`">{{ oscar}}</NuxtLink> -- {{ poster }}</pre>
  </div>
</template>
