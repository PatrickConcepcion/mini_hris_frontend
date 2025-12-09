<template>
  <div class="h-screen w-full flex items-center justify-center">
    <UCard class="w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-4">Welcome to Mini HRIS</h1>
      <p class="text-center text-gray-600 mb-4">You are logged in!</p>
      <div v-if="authStore.user" class="text-center mb-4">
        <p class="text-sm text-gray-500">Hello, {{ authStore.user.email }}</p>
      </div>
      <UButton @click="handleLogout" color="error">Logout</UButton>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    await navigateTo('/login')
    return
  }

  // Fetch user if not already loaded
  if (!authStore.user) {
    try {
      await authStore.fetchUser()
    } catch {
      await navigateTo('/login')
    }
  }
})

const handleLogout = async () => {
  await authStore.logout()
  await navigateTo('/login')
}
</script>