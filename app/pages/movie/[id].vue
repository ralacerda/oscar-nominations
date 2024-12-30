<script setup lang="ts">
import PosterImage from "@/components/Images/PosterImage.vue";

const route = useRoute();

const { data: movie, error } = useFetch(
  `/api/movies/${route.params.id as string}`,
);

const { data: providers } = useFetch(
  `/api/movies/${route.params.id as string}/providers`,
);
</script>

<template>
  <div>
    <div class="backdrop">
      <img
        width="1280"
        height="720"
        :src="`https://image.tmdb.org/t/p/w1280${movie?.backdropPath}`"
      />
    </div>
    <main>
      {{ error }}
      <div v-if="movie" class="card">
        <PosterImage :path="movie.posterPath" />
        <ul>
          <li v-for="crew in movie.crew" :key="crew.id">
            {{ crew.personId }} - {{ crew.job }}
          </li>
        </ul>
        <ProvidersList v-if="providers" v-bind="providers" />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.backdrop img {
  width: 100vw;
  height: 100%;
  object-fit: cover;
  position: fixed;
  z-index: -1;
  filter: blur(10px) saturate(70%) brightness(0.7);
}

main {
  display: grid;
  height: 100vh;
  align-items: center;
}

.card {
  padding: 20px;
  border-radius: 12px;
  background: var(--neutral-9);
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  gap: 26px;
}
</style>
