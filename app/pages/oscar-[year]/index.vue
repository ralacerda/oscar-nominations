<script setup lang="ts">
const route = useRoute();

const { state } = useQuery({
  key: () => ["top-movies", route.params.year as string],
  query: () => $fetch(`/api/nominations/${route.params.year}`),
});
</script>

<template>
  <main>
    <div v-if="state.status == 'success'">
      <PageTitle>Oscar {{ route.params.year }}</PageTitle>
      <ul>
        <li v-for="movie in state.data" :key="movie.id">
          <MovieCard v-bind="movie" />
        </li>
      </ul>
    </div>
  </main>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-block: 35px;
}
</style>
