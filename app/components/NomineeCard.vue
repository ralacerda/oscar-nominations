<script setup lang="ts">
import ProfileImage from "@/components/Images/ProfileImage.vue";

defineProps<{
  name: string;
  profileImagePath: string | null;
  won: boolean;
  movie: {
    id: number;
    title: string;
    originalTitle: string;
  };
}>();
</script>

<template>
  <BasicCard :id="movie.id" size="compact">
    <template #poster>
      <ProfileImage v-if="profileImagePath" :path="profileImagePath" />
    </template>
    <template #title>
      {{ name }}
    </template>
    <template #small-title>
      <NuxtLink :to="`/movie/${movie.id}`">{{ movie.title }}</NuxtLink>
      <template v-if="movie.title !== movie.originalTitle">
        ({{ movie.originalTitle }})</template
      >
    </template>
  </BasicCard>
</template>
