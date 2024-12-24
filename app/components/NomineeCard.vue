<script setup lang="ts">
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
  <div class="card">
    <div class="poster">
      <img :src="getProfileImageURL(profileImagePath, 'w185')" alt="" />
    </div>

    <div class="info">
      <h2 class="title">
        {{ name }}
      </h2>
      <div class="small-title">
        {{ movie.title }}
        <template v-if="movie.title !== movie.originalTitle"
          >({{ movie.originalTitle }})</template
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin: 20px;
  padding: 20px;
  border-radius: 12px;
  background: var(--neutral-9);
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);

  display: grid;
  grid-template-columns: 150px 1fr;
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
</style>
