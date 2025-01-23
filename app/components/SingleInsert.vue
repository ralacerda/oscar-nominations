<script setup lang="ts">
const { requiresNominee } = defineProps<{
  requiresNominee: boolean;
}>();

const emit = defineEmits<{
  submit: [
    movieId: number,
    won: boolean,
    nomineeId?: number,
    imdbCode?: boolean,
  ];
}>();

const currentTitle = ref<number>();
const currentNominee = ref<number>();
const imdbCode = ref<boolean>();
const won = ref(false);

function submit() {
  if (!currentTitle.value || (requiresNominee && !currentNominee.value)) {
    return;
  }

  emit(
    "submit",
    currentTitle.value,
    won.value,
    currentNominee.value,
    imdbCode.value,
  );
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model.number="currentTitle" />
    <input v-if="requiresNominee" v-model.number="currentNominee" />
    <label for="won">Won</label>
    <input id="won" v-model="won" type="checkbox" />
    <label for="imdbCode">IMDb Code</label>
    <input id="imdbCode" v-model="imdbCode" type="checkbox" />

    <button type="submit">Submit</button>
  </form>
</template>
