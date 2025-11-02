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
            type="email"
            placeholder="Email or Username"
            class="w-full"
            icon="i-heroicons-user"
          />
        </UFormField>

        <UFormField label="Password" name="password" class="w-full">
          <UInput
            v-model="state.password"
            type="password"
            class="w-full"
            placeholder="Password"
            icon="lucide:lock-keyhole"
          />
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

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  console.log('Login submitted with valid data:', event.data)
  // Here you would typically make an API call
}
</script>
