<script setup lang="ts">
const { size = "medium", path } = defineProps<{
  size?: "small" | "medium";
  path: string | undefined;
}>();

const height = computed(() => (size === "small" ? 68 : 278));
const width = computed(() => (size === "small" ? 45 : 185));

const src = computed(() => {
  if (path) return `https://image.tmdb.org/t/p/w${width.value}${path}`;
  return "/fallback.png";
});
</script>

<template>
  <img :src :height :width alt="" />
</template>
