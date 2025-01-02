<script setup lang="ts">
import PosterImage from "@/components/Images/PosterImage.vue";

const { nominations } = defineProps<{
  title: Movie["title"];
  id: Movie["id"];
  originalTitle: Movie["originalTitle"];
  posterPath: Movie["posterPath"];
  overview: Movie["overview"];
  runtime: Movie["runtime"];
  genres: Movie["genres"];
  nominations: {
    won: boolean;
    award: { title: string; id: string };
    nominee: { name: string } | null;
  }[];
}>();
</script>

<template>
  <BasicCard :id>
    <template #poster>
      <PosterImage :path="posterPath" />
    </template>
    <template #title>
      <NuxtLink :to="`/movie/${id}`">{{ title }}</NuxtLink>
    </template>
    <template v-if="title !== originalTitle" #small-title>
      {{ originalTitle }}
    </template>
    <div class="info">
      <div class="runtime-genres">
        <span class="runtime">{{ runtime }} min</span>-
        <ul class="genres">
          <li v-for="genre in genres.split(',')" :key="genre">
            {{ genre }}
          </li>
        </ul>
      </div>
      <NominationList :nominations="nominations" />
    </div>
  </BasicCard>
</template>

<style lang="scss" scoped>
.runtime-genres {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.75rem;
}

.runtime {
  color: var(--neutral-6);
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
</style>
