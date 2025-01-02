<script setup lang="ts">
import ProfileImage from "@/components/Images/ProfileImage.vue";

defineProps<{
  name: string;
  jobs: string;
  profileImagePath: string;
}>();
</script>

<template>
  <div class="crew-cast-profile">
    <ProfileImage :path="profileImagePath || ''" />
    <div class="info">
      <h3>{{ name }}</h3>
      <p>{{ jobs }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.crew-cast-profile {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--step--1);
  line-height: 1;

  :deep(img) {
    width: 120px;
    height: auto;
    border-radius: 0.25rem;
  }

  .info {
    h3 {
      font-weight: 500;
    }

    p {
      font-size: var(--step-0);
      color: var(--neutral-6);
      margin-top: 0.25rem;
    }
  }
}
</style>
