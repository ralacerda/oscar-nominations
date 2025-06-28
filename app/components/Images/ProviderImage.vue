<script setup lang="ts">
defineProps<{
  path: string;
  providerName: string;
}>();
</script>

<template>
  <img
    :src="`https://image.tmdb.org/t/p/w45${path}`"
    :alt="providerName"
    height="45"
    width="45"
  />
</template>
