<script setup lang="ts">
import ProviderImage from "@/components/Images/ProviderImage.vue";

const route = useRoute();

const { data: movie, error } = useFetch(
  `/api/movies/${route.params.id as string}`,
);

const { data: providers } = useFetch(
  `/api/movies/${route.params.id as string}/providers`,
);
</script>

<template>
  <main>
    {{ error }}
    {{ movie }}
    <ul v-if="movie">
      <li v-for="crew in movie.crew" :key="crew.id">
        {{ crew.personId }} - {{ crew.job }}
      </li>
    </ul>
    <p>Streaming:</p>
    <ul v-if="providers">
      <li v-for="provider in providers.flatrate" :key="provider.provider_id">
        <ProviderImage :path="provider.logo_path" />
        {{ provider.provider_name }}
      </li>
    </ul>
    <p>Alugar</p>
    <ul v-if="providers">
      <li v-for="provider in providers.rent" :key="provider.provider_id">
        <ProviderImage :path="provider.logo_path" />
        {{ provider.provider_name }}
      </li>
    </ul>
    <p>Comprar</p>
    <ul v-if="providers">
      <li v-for="provider in providers.buy" :key="provider.provider_id">
        <ProviderImage :path="provider.logo_path" />
        {{ provider.provider_name }}
      </li>
    </ul>
  </main>
</template>
