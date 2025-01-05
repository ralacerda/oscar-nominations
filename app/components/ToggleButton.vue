<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<template>
  <button
    class="toggle-button"
    :data-active="model === true"
    @click="model = !model"
  >
    {{
      model
        ? "Remover da minha lista de filmes"
        : "Adicionar a minha lista de filmes"
    }}
  </button>
</template>

<style lang="scss" scoped>
.toggle-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background: none;
  outline: 1px solid var(--blue-10);
  color: var(--neutral-1);
  font-size: var(--step-0);
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);

  &[data-active="true"] {
    background: var(--blue-5);
    color: var(--neutral-12);
    border: none;
  }
}
</style>
