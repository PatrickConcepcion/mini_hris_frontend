import { $fetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  // Initialize auth from localStorage
  authStore.initializeAuth()

  // Configure custom $api instance
  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      const token = authStore.token
      if (token) {
        options.headers = new Headers(options.headers)
        options.headers.set('Authorization', `Bearer ${token}`)
      }
    },
    async onResponseError({ response, request, options }) {
      if (response.status === 401 && authStore.isAuthenticated) {
        try {
          // Try to refresh token
          await authStore.refreshToken()

          // Retry the original request with new token
          return api(request, options) as unknown as Promise<void>
        } catch (refreshError) {
          // Refresh failed, clear auth and redirect
          authStore.clearAuth()
          await navigateTo('/login')
          throw refreshError
        }
      }

      // For other errors or if not authenticated, throw as usual
      throw new Error(`Request failed with status ${response.status}`)
    }
  })

  return {
    provide: {
      api
    }
  }
})