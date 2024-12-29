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

const nominationsWon = computed(() =>
  nominations.filter((nomination) => nomination.won),
);
</script>

<template>
  <BasicCard>
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
      <p class="overview">{{ overview }}</p>
      <div class="nominations">
        {{ nominations.length }}
        {{ nominations.length > 1 ? "Nomeações" : "Nomeação" }}
        <template v-if="nominationsWon.length > 0"
          >-
          <span class="won">
            {{ nominationsWon.length }}
            {{ nominationsWon.length > 1 ? "Conquistadas" : "Conquistada" }}
          </span></template
        >
        <ul class="nominations-list">
          <li
            v-for="nomination in nominations"
            :key="nomination.award.title"
            :data-won="nomination.won"
          >
            <NuxtLink :href="`/oscar-2024/${nomination.award.id}`">
              {{ nomination.award.title
              }}<template v-if="nomination.nominee">
                ({{ nomination.nominee.name }})</template
              >
            </NuxtLink>
          </li>
        </ul>
      </div>
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

.overview {
  margin-top: 0.25rem;
  font-size: 1rem;
  color: var(--neutral-4);
  overflow: hidden;
}

.nominations {
  color: var(--neutral-6);
  margin-top: 1.25rem;

  .won {
    color: var(--neutral-4);
    font-weight: 500;
  }
}

.nominations-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.5rem;
  font-size: 1.125rem;
  color: var(--neutral-5);

  li:not(:last-child)::after {
    content: ",";
  }

  li[data-won="true"] {
    color: var(--neutral-4);
    font-weight: 500;
  }
}
</style>
