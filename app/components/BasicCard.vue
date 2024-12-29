<template>
  <div class="card">
    <div class="poster">
      <slot name="poster" />
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
  margin: 20px;
  padding: 20px;
  border-radius: 12px;
  background: var(--neutral-9);
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  gap: 26px;
}

.title {
  font-size: 2rem;
  margin: 0;
}

.poster {
  grid-row: span 2;

  :deep(img) {
    border-radius: 6px;
  }
}

.small-title {
  font-size: 1.25rem;
  color: var(--neutral-5);
}
</style>
