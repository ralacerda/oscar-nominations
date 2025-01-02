<template>
  <div class="page-title">
    <h1><slot /></h1>
    <h2><slot name="subtitle" /></h2>
  </div>
</template>

<style lang="scss" scoped>
.page-title {
  margin-block: 16px 36px;
}

h1 {
  text-align: center;
  font-size: var(--step-5);
}

h2 {
  margin-top: 0.5rem;
  text-align: center;
  font-size: var(--step-4);
  color: var(--neutral-5);
}
</style>
