<script setup lang="ts">
const { size = "full" } = defineProps<{
  size?: "full" | "compact";
  id: number | string;
}>();
</script>

<template>
  <div class="card" :data-size="size">
    <div class="poster">
      <NuxtLink :to="`/movie/${id}`">
        <slot name="poster" />
      </NuxtLink>
    </div>
    <div class="info">
      <h2 class="title"><slot name="title" /></h2>
      <h3 class="small-title"><slot name="small-title" /></h3>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 20px;
  border-radius: 12px;
  background: var(--neutral-9);
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  gap: 26px;

  @media screen and (max-width: 720px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
  }
}

.info {
  max-width: fit-content;
}

.title {
  font-size: var(--step-4);
  margin-bottom: 0.5rem;

  [data-size="compact"] & {
    font-size: var(--step-3);
  }
}

.poster {
  grid-row: span 2;

  :deep(img) {
    border-radius: 6px;
  }
}

.small-title {
  font-size: var(--step-2);
  color: var(--neutral-5);

  [data-size="compact"] & {
    font-size: var(--step-1);
  }
}
</style>
