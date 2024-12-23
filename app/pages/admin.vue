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
  query: () => $fetch(`/api/nominations/2024/${currentAward.value.id}`),
});

async function submit(movieId: number, won: boolean, nominee?: number) {
  await $fetch(`/api/nominations/2024/${currentAward.value.id}`, {
    method: "POST",
    body: {
      movie: movieId,
      nominee: nominee,
      won,
    },
  });

  refetch();
}

async function submitBatch(content: string) {
  await $fetch(`/api/nominations/2024/${currentAward.value.id}/batch`, {
    method: "POST",
    body: {
      content,
    },
  });

  refetch();
}

async function markAsWinner(nominationId: number) {
  await $fetch(
    `/api/nominations/2024/${currentAward.value.id}/${nominationId}`,
    {
      method: "PATCH",
      body: { won: true },
    },
  );

  refetch();
}

async function deleteNomination(nominationId: number) {
  await $fetch(
    `/api/nominations/2024/${currentAward.value.id}/${nominationId}`,
    {
      method: "DELETE",
    },
  );

  refetch();
}
</script>

<template>
  <main>
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
          <button @click="markAsWinner(nomination.id)">Mark as winner</button>
          <button @click="deleteNomination(nomination.id)">Delete</button>
        </li>
      </ul>
    </div>
  </main>
</template>
