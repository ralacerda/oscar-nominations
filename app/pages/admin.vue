<script setup lang="ts">
import PosterImage from "~/components/Images/PosterImage.vue";
import ProfileImage from "~/components/Images/ProfileImage.vue";

const { data: awards } = await useFetch("/api/awards", {
  query: {
    shorts: "exclude",
  },
});

const { data: oscars } = await useFetch("/api/oscars");

if (!awards.value || !oscars.value) {
  throw new Error("No awards or Oscars found");
}

const currentAward = ref<Award>(awards.value[0]!);
const currentOscar = ref<Oscar>(oscars.value[0]!);
const nominationCount = computed(() => {
  return state.value.data?.length || 0;
});

const { state, refetch } = useQuery({
  key: () => ["nomination", currentAward.value.id, currentOscar.value.id],
  query: () =>
    $fetch(
      `/api/nominations/${currentOscar.value.id}/${currentAward.value.id}`,
    ),
});

async function submit(movieId: number, won: boolean, nominee?: number) {
  await $fetch(
    `/api/nominations/${currentOscar.value.id}/${currentAward.value.id}`,
    {
      method: "POST",
      body: {
        id: movieId,
        nominee: nominee,
        won,
      },
    },
  );

  refetch();
}

async function submitBatch(content: string) {
  const nominations = content.split("\n").map((line) => {
    if (currentAward.value.requiresNominee) {
      const [movie, nominee, won] = line.split(",");
      return {
        id: parseInt(movie!),
        nominee: parseInt(nominee!),
        won: won == "true" ? true : false,
      };
    }

    const [id, won] = line.split(",");
    return {
      id: parseInt(id!),
      won: won == "true" ? true : false,
    };
  });

  await $fetch(
    `/api/nominations/${currentOscar.value.id}/${currentAward.value.id}/`,
    {
      method: "POST",
      body: nominations,
    },
  );

  refetch();
}

async function markAsWinner(nominationId: number) {
  await $fetch(
    `/api/nominations/${currentOscar.value.id}/${currentAward.value.id}/${nominationId}`,
    {
      method: "PATCH",
      body: { won: true },
    },
  );

  refetch();
}

async function deleteNomination(nominationId: number) {
  await $fetch(
    `/api/nominations/${currentOscar.value.id}/${currentAward.value.id}/${nominationId}`,
    {
      method: "DELETE",
    },
  );

  refetch();
}
</script>

<template>
  <main>
    <select v-model="currentOscar">
      <option v-for="oscar in oscars" :key="oscar.id" :value="oscar">
        {{ oscar.id }}
      </option>
    </select>
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
      {{ nominationCount }} nominations
      <ul>
        <li v-for="nomination in state.data" :key="nomination.movieId">
          {{ nomination.movie.title }}
          <span v-if="nomination.nominee">({{ nomination.nominee }})</span>
          <span v-if="nomination.won"> - Winner</span>
          <PosterImage :path="nomination.movie.posterPath" />
          <ProfileImage
            v-if="nomination.nominee"
            :path="nomination.nominee.profileImagePath || ''"
          />

          <button @click="markAsWinner(nomination.id)">Mark as winner</button>
          <button @click="deleteNomination(nomination.id)">Delete</button>
        </li>
      </ul>
    </div>
  </main>
</template>
