<template>
  <div class="pt-16">
    <h2 class="text-5xl font-bold text-center">Register</h2>
    <div class="flex justify-center">
      <UForm :state="state" class="space-y-4" :validate="validate" @submit="register">
        <UFormGroup label="Username" name="username" class="w-96" size="xl">
          <UInput v-model="state.username" :color="state.errors.username ? 'red' : 'white'" />
        </UFormGroup>
        <p class="text-red-600" v-if="state.errors.username">{{ state.errors.username }}</p>
        <UFormGroup label="Password" name="password1" size="xl">
          <UInput v-model="state.password1" type="password" :color="state.errors.password ? 'red' : 'white'" />
        </UFormGroup>
        <UFormGroup label="Confirm Password" name="password2" size="xl">
          <UInput v-model="state.password2" type="password" :color="state.errors.password ? 'red' : 'white'" />
        </UFormGroup>
        <p class="text-red-600" v-if="state.errors.password">{{ state.errors.password }}</p>
        <UButton type="submit" class="flex w-96 justify-center text-lg">
          Submit
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
    title: "Register"
})
import type { FormError, FormSubmitEvent } from '#ui/types'
const toast = useToast()
const { signUp } = useAuth()
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/all"
  }
})

interface Schema {
  username?: string,
  password1?: string,
  password2?: string,
  errors: { password: string, username: string }
}

const state = reactive<Schema>({
  username: undefined,
  password1: undefined,
  password2: undefined,
  errors: {
    password: "",
    username: ""
  }
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.username) errors.push({ path: 'username', message: 'Required' })
  if (state.password1 != state.password2 && state.password2) errors.push({ path: 'password2', message: 'Passwords must match' })
  return errors

}

const register = async (e: Event) => {
  try {
    let res = await signUp({ username: state.username, password: state.password2 }, { callbackUrl: "/all", redirect: true })
    toast.add({ title: `Account Created. You have been logged in as ${state.username}`, color: "green" })
    return
  } catch (err: any) {
    if (err.response._data.error.includes("password"))
      state.errors.password = err.response._data.error
    if (err.response._data.error.includes("username"))
      state.errors.username = err.response._data.error
  }
}

</script>

<style lang="scss" scoped></style>