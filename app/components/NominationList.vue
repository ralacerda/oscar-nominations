<script setup lang="ts">
const { nominations } = defineProps<{
  nominations: {
    won: boolean;
    award: { title: string; id: string };
    nominee: { name: string } | null;
  }[];
}>();

const nominationsWon = computed(() =>
  nominations.filter((nomination) => nomination.won),
);
</script>

<template>
  <div class="nominations">
    {{ nominations.length }}
    {{ nominations.length > 1 ? "Nomeações" : "Nomeação" }}
    <template v-if="nominationsWon.length > 0"
      >-
      <span class="won">
        {{ nominationsWon.length }}
        {{ nominationsWon.length > 1 ? "Conquistadas" : "Conquistada" }}
      </span></template
    >
    <ul class="nominations-list">
      <li
        v-for="nomination in nominations"
        :key="nomination.award.title"
        :data-won="nomination.won"
      >
        <NuxtLink :href="`/oscar-2024/${nomination.award.id}`">
          {{ nomination.award.title
          }}<template v-if="nomination.nominee">
            ({{ nomination.nominee.name }})</template
          >
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.nominations {
  color: var(--neutral-6);
  margin-top: 1.25rem;

  .won {
    color: var(--neutral-4);
    font-weight: 500;
  }
}

.nominations-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.5rem;
  font-size: 1.125rem;
  color: var(--neutral-5);

  li:not(:last-child)::after {
    content: ",";
  }

  li[data-won="true"] {
    color: var(--neutral-4);
    font-weight: 500;
  }
}
</style>
