<script setup lang="ts">
import PosterImage from "@/components/Images/PosterImage.vue";

defineProps<{
  year: string;
  posters: string[];
}>();
</script>

<template>
  <div class="oscar-card">
    <h2>
      <NuxtLink :to="`/oscar-${year}`">Oscar {{ year }}</NuxtLink>
    </h2>
    <div class="poster-grid">
      <PosterImage
        v-for="poster in posters"
        :key="poster"
        :path="poster"
        size="small"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.oscar-card {
  padding: 20px 30px;
  border-radius: 12px;
  background: var(--neutral-9);
  max-width: fit-content;
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);
  position: relative;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;

    a::after {
      content: "";
      position: absolute;
      inset: 0;
    }
  }
}

.poster-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
