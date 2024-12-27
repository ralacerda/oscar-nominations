<script setup lang="ts">
defineProps<{
  path: string;
}>();
</script>

<template>
  <img :src="`https://image.tmdb.org/t/p/w92${path}`" alt="" />
</template>
