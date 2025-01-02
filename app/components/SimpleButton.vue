<template>
  <button class="simple-button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background: var(--primary-9);
  color: var(--neutral-1);
  font-size: var(--step-0);
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);

  &:hover {
    background: var(--primary-8);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 3px solid var(--primary-4);
  }

  &:active {
    background: var(--primary-11);
  }
}
</style>
