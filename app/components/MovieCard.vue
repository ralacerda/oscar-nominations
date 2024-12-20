<script setup lang="ts">
const { nominations } = defineProps<{
  title: Movie["title"];
  originalTitle: Movie["originalTitle"];
  posterPath: Movie["posterPath"];
  overview: Movie["overview"];
  runtime: Movie["runtime"];
  genres: Movie["genres"];
  nominations: {
    won: boolean;
    category: { title: string; id: string };
    nominee: { name: string } | null;
  }[];
}>();

const nominationsWon = computed(() =>
  nominations.filter((nomination) => nomination.won),
);
</script>

<template>
  <div class="card">
    <div class="poster">
      <img :src="getPosterImageURL(posterPath, 'w342')" alt="" />
    </div>

    <div class="info">
      <h2 class="title">
        {{ title }}
      </h2>
      <div v-if="title !== originalTitle" class="small-title">
        {{ originalTitle }}
      </div>
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
          >- {{ nominationsWon.length }}
          {{
            nominationsWon.length > 1 ? "Conquistadas" : "Conquistada"
          }}</template
        >
        <ul class="nominations-list">
          <li
            v-for="nomination in nominations"
            :key="nomination.category.title"
          >
            <NuxtLink :href="`/category/${nomination.category.id}`">
              {{ nomination.category.title
              }}<template v-if="nomination.nominee">
                ({{ nomination.nominee.name }})</template
              >
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.original-title {
  font-style: italic;
  font-size: 0.8rem;
}

.card {
  margin: 20px;
  padding: 20px;
  border-radius: 12px;
  background: var(--neutral-9);
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);

  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr auto;
  gap: 26px;
}

.title {
  font-size: 2rem;
  margin: 0;
}

.small-title {
  font-size: 1.25rem;
  color: var(--neutral-5);
}

.poster {
  grid-row: span 2;

  img {
    border-radius: 6px;
  }
}

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
}

.nominations-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.5rem;
  font-size: 1.125rem;
  color: var(--neutral-4);

  li:not(:last-child)::after {
    content: ",";
  }
}
</style>
