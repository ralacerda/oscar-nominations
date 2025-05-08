<script setup lang="ts">
import PosterImage from "@/components/Images/PosterImage.vue";

const route = useRoute();

const { data: movie } = useFetch(`/api/movies/${route.params.id as string}`);

const { data: providers } = useFetch(
  `/api/movies/${route.params.id as string}/providers`,
);

const nominations = computed(() => {
  return movie.value?.nominations.map((nomination) => ({
    won: nomination.won,
    award: { title: awardTitles[nomination.awardId], id: nomination.awardId },
    nominee: nomination.nominee,
    oscarId: nomination.oscarId,
  }));
});

const crewMembers = computed(() => {
  return new Set(movie.value?.crew.map((member) => member.name));
});

function getJobs(name: string, crewMembers: { name: string; job: string }[]) {
  return crewMembers
    .filter((member) => member.name === name)
    .map(
      (member) => jobsTranslations[member.job as keyof typeof jobsTranslations],
    )
    .join(", ");
}

function findProfilePicture(
  name: string,
  crewMembers: { name: string; job: string; profileImagePath?: string }[],
) {
  return crewMembers.find((member) => member.name === name)?.profileImagePath;
}
</script>

<template>
  <div>
    <div class="backdrop">
      <img
        width="1280"
        height="720"
        :src="`https://image.tmdb.org/t/p/w1280${movie?.backdropPath}`"
      />
    </div>
    <main>
      <div v-if="movie" class="card">
        <PosterImage :path="movie.posterPath" />
        <div class="info">
          <h1 class="title">{{ movie.title }}</h1>
          <template v-if="movie.title !== movie.originalTitle">{{
            movie.originalTitle
          }}</template>
          <div class="runtime-genres">
            <span class="runtime">{{ movie.runtime }} min</span>-
            <ul class="genres">
              <li v-for="genre in movie.genres" :key="genre">
                {{ genre }}
              </li>
            </ul>
          </div>
          <p class="overview">{{ movie.overview }}</p>
          <NominationList v-if="nominations" :nominations />
          <div class="crew">
            <ul>
              <li v-for="crewMember in crewMembers" :key="crewMember">
                <CrewCastProfile
                  :name="crewMember"
                  :jobs="getJobs(crewMember, movie.crew)"
                  :profile-image-path="
                    findProfilePicture(crewMember, movie.crew)
                  "
                />
              </li>
            </ul>
          </div>
          <div class="crew">
            <ul>
              <li v-for="castMember in movie.cast" :key="castMember.name">
                <CrewCastProfile
                  :name="castMember.name"
                  :jobs="castMember.character"
                  :profile-image-path="castMember.profileImagePath"
                />
              </li>
            </ul>
          </div>
        </div>
        <ProvidersList v-if="providers" v-bind="providers" />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.backdrop img {
  width: 100vw;
  height: 100lvh;
  overflow: hidden;
  object-fit: cover;
  position: fixed;
  inset: 0;
  z-index: -1;
  filter: blur(10px) saturate(70%) brightness(0.5);
}

main {
  display: grid;
  min-height: 100lvh;
  align-items: center;
  padding-block: 12px;
}

.card {
  padding: 20px;
  border-radius: 12px;
  background: var(--neutral-9);
  box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  gap: 26px;

  @media screen and (max-width: 780px) {
    grid-template-columns: 1fr;
  }
}

.runtime-genres {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.75rem;
}

.runtime {
  color: var(--neutral-6);
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

h1 {
  font-size: var(--step-5);
}

.overview {
  margin-top: 0.25rem;
  font-size: var(--step-0);
  color: var(--neutral-4);
  overflow: hidden;
  max-width: 80ch;
}

.crew {
  margin-top: 1.5rem;

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1.25rem;
  }
}

.info {
  grid-row: span 2;
}
</style>
