<script setup lang="ts">
defineProps<{
  href?: string;
}>();
</script>

<template>
  <component :is="href ? 'a' : 'button'" class="simple-button" :href>
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.simple-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background: var(--blue-9);
  color: var(--neutral-1);
  font-size: var(--step-0);
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);

  &:hover {
    background: var(--blue-8);
    text-decoration: none;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 3px solid var(--blue-4);
  }

  &:active {
    background: var(--blue-11);
  }
}
</style>
