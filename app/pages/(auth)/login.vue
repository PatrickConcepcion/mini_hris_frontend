<template>
  <div class="h-screen w-full flex items-center justify-center">
    <UCard class="w-full max-w-sm">

      <div class="flex justify-center items-center w-full">
        <UIcon name="lucide:clock-3" class="text-2xl text-info mr-2" />
        <h3 class="text-2xl font-bold">
          <span class="text-info">TimeTracke</span>HR
        </h3>
      </div>
   
      <UForm :schema="loginSchema" :state="state" @submit="onSubmit" class="space-y-4 p-6">
        <UFormField label="Email" name="email" class="w-full">
          <UInput
            v-model="state.email"
            color="secondary"
            type="email"
            placeholder="Email or Username"
            class="w-full"
            icon="i-heroicons-user"
          />
        </UFormField>

        <UFormField label="Password" name="password" class="w-full">
          <UInput
            v-model="state.password"
            color="secondary"
            :type="showPassword ? 'text' : 'password'"
            class="w-full"
            placeholder="Password"
            icon="lucide:lock-keyhole"
          >
            <template #trailing>
              <UButton
                variant="link"
                color="neutral"
                @click="showPassword = !showPassword"
                :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                size="sm"
              />
            </template>
          </UInput>
        </UFormField>

        <div class="flex justify-between items-center">
          <UCheckbox color="secondary" v-model="state.remember_me" label="Remember Me" />
          <UButton variant="link" color="info" class="cursor-pointer" size="sm">Forgot Password?</UButton>
        </div>


        <UButton block type="submit" label="Login" color="info" />
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  remember_me: z.boolean()
})

type Schema = z.output<typeof loginSchema>

const state = reactive({
  email: '',
  password: '',
  remember_me: false,
})

const showPassword = ref(false)

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const authStore = useAuthStore()
  const toast = useToast()

  try {
    await authStore.login({
      email: event.data.email,
      password: event.data.password
    })

    // Navigate to home page
    await navigateTo('/')
  } catch (error: any) {
    console.error('Login error:', error)
    toast.add({
      title: 'Login Failed',
      description: error.data?.message || 'An error occurred during login.',
      color: 'warning'
    })
  }
}
</script>
