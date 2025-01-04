<script setup lang="ts">
const model = defineModel<
  "watchlist" | "watched" | "recommended" | undefined
>();

const buttons = [
  { action: "watchlist", label: "Quero assistir" },
  { action: "watched", label: "Assisti" },
  { action: "recommended", label: "Recomendo" },
] as const;
</script>

<template>
  <div class="status-radio-buttons">
    <button
      v-for="button in buttons"
      :key="button.action"
      :data-active="model === button.action"
      :data-action="button.action"
      @click="model = model == button.action ? undefined : button.action"
    >
      {{ button.label }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.status-radio-buttons {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background: none;
  outline: 1px solid var(--button-border);
  color: var(--neutral-1);
  font-size: var(--step-0);
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);

  &[data-active="true"] {
    background: var(--button-background);
    color: var(--neutral-12);
    border: none;
  }

  &[data-action="watchlist"] {
    --button-background: var(--blue-5);
    --button-border: var(--blue-10);
  }

  &[data-action="recommended"] {
    --button-background: var(--yellow-5);
    --button-border: var(--yellow-10);
  }

  &[data-action="watched"] {
    --button-background: var(--green-7);
    --button-border: var(--green-10);
  }
}
</style>
