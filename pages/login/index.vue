<template>
    <div class="pt-16">
        <h2 class="text-5xl font-bold text-center">Login</h2>
        <div class="flex justify-center">
        <UForm :state="state" class="space-y-4" :validate="validate" @submit="login">
            <div v-if="state.form">
                <UAlert
                    color="red"
                    variant="solid"
                    description="Invalid Username/Password"
                    class="mt-5 font-bold text-center"
                  />
            </div>
        <UFormGroup label="Username" name="username" class="w-96" size="xl">
          <UInput v-model="state.username" />
        </UFormGroup>
        <UFormGroup label="Password" name="password" size="xl">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <UButton type="submit" class="flex w-96 justify-center text-lg">
          Submit
        </UButton>
          </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: "Login"
})
const toast = useToast()
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
    }
})


const { signIn } = useAuth()

const login = async (e: Event) => {
    try {
        let res = await signIn(
            { username: state.username, password: state.password},
            { callbackUrl: '/'}
        )
        toast.add({title: `You have successfully logged in. Welcome back ${state.username}!`})
        return
    } catch (error) {
        state.form = true
        return
        }
    }

interface Schema {
    username?: string
    password?: string
    form?: boolean
}

const state = reactive<Schema>({
    username: undefined,
    password: undefined,
    form: false
})

const validate = (state: any) => {
    const errors = []
    if (!state.username) errors.push({path: 'username', message: 'Required'})
    if (!state.password) errors.push({path: 'password', message: 'Required'})
    return errors
}

</script>

<style scoped></style>