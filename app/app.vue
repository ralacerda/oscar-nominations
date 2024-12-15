<script setup lang="ts">
import type { awards as awardsScheme } from "~~/database/schema";

type Award = typeof awardsScheme.$inferSelect;

const { data: awards } = await useFetch("/api/awards", {
  query: {
    shorts: "exclude",
  },
});

if (!awards.value) {
  throw new Error("No awards found");
}

const currentAward = ref<Award>(awards.value[0]!);
const currentTitle = ref<number>();
const currentNominee = ref<number>();

const { state, refetch } = useQuery({
  key: () => ["nomination", currentAward.value.id],
  query: () =>
    $fetch(`/api/nominations/`, {
      query: { category: currentAward.value.id, oscarId: 2024 },
    }),
});

async function submit() {
  if (!currentTitle.value) {
    return;
  }

  const awardId = currentAward.value.id;
  const title = currentTitle.value;

  await $fetch("/api/nominations", {
    method: "POST",
    body: {
      award: awardId,
      movie: title,
      oscarId: 2024,
      nominee: currentNominee.value,
    },
  });

  refetch();
}
</script>

<template>
  {{ currentAward }}
  <div>
    <select v-model="currentAward">
      <option v-for="award in awards" :key="award.id" :value="award">
        {{ award.title }}
      </option>
    </select>

    <form @submit.prevent="submit">
      <input v-model.number="currentTitle" />
      <input
        v-if="currentAward.requiresNominee"
        v-model.number="currentNominee"
      />
      <button type="submit">Submit</button>
    </form>

    <div v-if="state.status == 'pending'">Loading...</div>

    <div v-else-if="state.status == 'error'">
      {{ state.error.message }}
    </div>

    <div v-else>
      {{ state.data }}
      <ul>
        <li v-for="nomination in state.data" :key="nomination.movieId">
          {{ nomination.movie.title }}
          <span v-if="nomination.nominee">({{ nomination.nominee }})</span>
          <span v-if="nomination.won"> - Winner</span>
        </li>
      </ul>
    </div>
  </div>
</template>
