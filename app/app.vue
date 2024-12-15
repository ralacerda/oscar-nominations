<script setup lang="ts">
const { data: awards } = await useFetch("/api/awards", {
  query: {
    shorts: "exclude",
  },
});

if (!awards.value) {
  throw new Error("No awards found");
}

const currentAward = ref<Award>(awards.value[0]!);

const { state, refetch } = useQuery({
  key: () => ["nomination", currentAward.value.id],
  query: () =>
    $fetch(`/api/nominations/`, {
      query: { category: currentAward.value.id, oscarId: 2024 },
    }),
});

async function submit(movieId: number, won: boolean, nominee?: number) {
  await $fetch("/api/nominations", {
    method: "POST",
    body: {
      award: currentAward.value.id,
      movie: movieId,
      oscarId: 2024,
      nominee: nominee,
      won,
    },
  });

  refetch();
}

async function submitBatch(content: string) {
  await $fetch("/api/nominations/batch", {
    method: "POST",
    body: {
      award: currentAward.value.id,
      oscarId: 2024,
      content,
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

    <SingleInsert
      :requires-nominee="currentAward.requiresNominee"
      @submit="submit"
    />

    <BatchInsert @submit="submitBatch" />

    <div v-if="state.status == 'pending'">Loading...</div>

    <div v-else-if="state.status == 'error'">
      {{ state.error.message }}
    </div>

    <div v-else>
      <ul>
        <li v-for="nomination in state.data" :key="nomination.movieId">
          {{ nomination.movie.title }}
          <span v-if="nomination.nominee">({{ nomination.nominee }})</span>
          <span v-if="nomination.won"> - Winner</span>
          <img
            :src="getPosterImageURL(nomination.movie.posterPath)"
            alt="Poster"
          />
          <img
            v-if="nomination.nominee?.profileImagePath"
            :src="getProfileImageURL(nomination.nominee.profileImagePath)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
