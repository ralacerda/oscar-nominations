<script setup lang="ts">
const { user, clear } = useUserSession();
</script>

<template>
  <SimpleButton v-if="!user" href="/auth/google">Login</SimpleButton>
  <div v-else class="user-menu">
    <span>{{ user.name }}</span>
    <img :src="user.picture" alt="User picture" height="20" widht="20" />
    <SimpleButton @click="clear">Logout</SimpleButton>
  </div>
</template>

<style lang="scss" scoped>
.user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    border-radius: 50%;
    height: 2.5rem;
  }
}
</style>
