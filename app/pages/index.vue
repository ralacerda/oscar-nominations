<script setup lang="ts">
const { data: posters } = useFetch("/api/oscars/posters");

useHead({
  title: "Nomeações Oscar",
});
</script>

<template>
  <main>
    <div class="oscar-grid">
      <OscarCard
        v-for="(poster, oscar) in posters"
        :key="oscar"
        :year="oscar"
        :posters="poster"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.oscar-grid {
  display: grid;
  place-items: center;
  min-height: 100dvh;
}
</style>
