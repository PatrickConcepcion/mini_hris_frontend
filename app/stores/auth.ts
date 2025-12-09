import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(null)
  const user = ref<any | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const bearerToken = computed(() => token.value ? `Bearer ${token.value}` : null)

  // Actions
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const { $api } = useNuxtApp()
      const response = await $api('/auth/login', {
        method: 'POST',
        body: credentials,
      })
      setToken(response.access_token)
      await fetchUser()
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      const { $api } = useNuxtApp()
      await $api('/auth/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
    }
  }

  const fetchUser = async () => {
    try {
      const { $api } = useNuxtApp()
      const response = await $api('/auth/me')
      user.value = response.data
    } catch (error: any) {
      console.error('Failed to fetch user:', error)
      clearAuth()
      throw error
    }
  }

  const refreshToken = async () => {
    try {
      const { $api } = useNuxtApp()
      const response = await $api('/auth/refresh', {
        method: 'POST',
      })
      setToken(response.access_token)
      return response
    } catch (error) {
      console.error('Token refresh failed:', error)
      clearAuth()
      throw error
    }
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('access_token', newToken)
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('access_token')
  }

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('access_token')
    if (storedToken) {
      token.value = storedToken
      // Optionally fetch user here, but might be async
    }
  }

  return {
    // State
    token,
    user,
    // Getters
    isAuthenticated,
    bearerToken,
    // Actions
    login,
    logout,
    fetchUser,
    refreshToken,
    setToken,
    clearAuth,
    initializeAuth,
  }
})
