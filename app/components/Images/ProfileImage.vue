<script setup lang="ts">
const { size = "medium" } = defineProps<{
  size?: "small" | "medium";
  path: string;
}>();

const height = computed(() => (size === "small" ? 68 : 278));
const width = computed(() => (size === "small" ? 45 : 185));
</script>

<template>
  <img
    :src="`https://image.tmdb.org/t/p/w${width}${path}`"
    :height
    :width
    alt=""
  />
</template>
