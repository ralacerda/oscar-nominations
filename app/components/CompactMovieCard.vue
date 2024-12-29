<script setup lang="ts">
import PosterImage from "@/components/Images/PosterImage.vue";

defineProps<{
  title: string;
  posterPath: string | null;
  won: boolean;
  id: number;
  originalTitle: string;
}>();
</script>

<template>
  <BasicCard size="compact">
    <template #poster>
      <PosterImage v-if="posterPath" :path="posterPath" size="small" />
    </template>
    <template #title>
      {{ title }}
    </template>
    <template v-if="title !== originalTitle" #small-title>
      {{ originalTitle }}
    </template>
  </BasicCard>
</template>
