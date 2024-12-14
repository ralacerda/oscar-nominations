<script setup lang="ts">
const { data: awards } = await useFetch('/api/awards', {
  query: {
    shorts: 'exclude',
  },
})

if (!awards.value) {
  throw new Error('No awards found')
}

const currentAward = ref<Award>(awards.value[0]!)
const currentTitle = ref<number>()

function submit() {
  if (!currentTitle.value) {
    return
  }

  const awardId = currentAward.value.id
  const title = currentTitle.value

  $fetch('/api/nominations', {
    method: 'POST',
    body: { category: awardId, movie: title, oscarId: 2024 },
  })
}
</script>

<template>
  <div>
    <select v-model="currentAward">
      <option
        v-for="award in awards"
        :key="award.id"
        :value="award"
      >
        {{ award.title }}
      </option>
    </select>

    <form @submit.prevent="submit">
      <input v-model.number="currentTitle">
      <button type="submit">
        Submit
      </button>
    </form>
  </div>
</template>
