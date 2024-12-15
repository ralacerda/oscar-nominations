<script setup lang="ts">
const nominations = ref<string>("");

defineEmits<{
  submit: [content: string];
}>();
</script>

<template>
  <form @submit.prevent="$emit('submit', nominations)">
    <textarea v-model="nominations" rows="10" cols="30" />
    <button>Submit</button>
  </form>
</template>
