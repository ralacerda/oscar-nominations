<script setup lang="ts">
import type { Providers } from "~~/shared/types/providers";
import ProviderImage from "~/components/Images/ProviderImage.vue";

defineProps<Providers>();
</script>

<template>
  <div>
    <template v-if="flatrate?.length">
      <div class="type">Streaming</div>
      <ul>
        <li v-for="provider in flatrate" :key="provider.provider_id">
          <ProviderImage
            :path="provider.logo_path"
            :provider-name="provider.provider_name"
          />
        </li>
      </ul>
    </template>
    <template v-if="rent?.length">
      <div class="type">Alugar</div>
      <ul>
        <li v-for="provider in rent" :key="provider.provider_id">
          <ProviderImage
            :path="provider.logo_path"
            :provider-name="provider.provider_name"
          />
        </li>
      </ul>
    </template>
    <template v-if="buy?.length">
      <div class="type">Comprar</div>
      <ul>
        <li v-for="provider in buy" :key="provider.provider_id">
          <ProviderImage
            :path="provider.logo_path"
            :provider-name="provider.provider_name"
          />
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.type {
  margin-block: 0.5rem 0;
  color: var(--neutral-5);
}

ul {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  flex-wrap: wrap;
  padding-block: 0.25rem 0.75rem;
}
</style>
