<template>
    <div class="b-16 container max-w-96 xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl mx-auto">
        <header class="pb-3">
            <div class="flex justify-between items-center  mx-auto">
                <div class="flex items-center justify-center">
                    <img src="/svg/scissors.svg" alt="" srcset="" class="w-12">
                    <ULink to="/" class="text-3xl font-bold">
                        Snippetz
                    </ULink>
                    <div class="flex pt-2 mx-2">
                        <form @submit.prevent="onSearchSubmit">
                            <UInput v-model="searchTerms" color="white" variant="outline" placeholder="Search..."
                                class="" size="xs" :ui="{ icon: { trailing: { pointer: '' } } }">
                                <template #trailing>
                                    <UButton icon="i-heroicons-magnifying-glass" color="gray" :padded="false"
                                        type="submit" />
                                </template>
                            </UInput>
                        </form>
                        <UButton to="/all" variant="link" active-class="underline" color="gray">
                            All Snippets
                        </UButton>
                    </div>
                </div>
                <template v-if="status === 'unauthenticated'">
                    <UHorizontalNavigation :links="signedOutLinks" :ui="{ wrapper: '' }" />
                </template>
                <template v-if="status === 'authenticated'">
                    <UHorizontalNavigation :links="signedInLinks" :ui="{ wrapper: '' }" />
                </template>
            </div>
        </header>

        <UNotifications />
        <slot />
    </div>

</template>

<script setup lang="ts">
const route = useRoute()
const toast = useToast()
const { signOut, status, data, token } = useAuth()
let searchTerms = ref("")

const signedOutLinks = [{
    label: "Login",
    to: "/login"
},
{
    label: "Register",
    to: "/register"
}
]
const signedInLinks = computed(() => [
    {
        label: "Create Snippet",
        icon: "material-symbols:add",
        to: "/"
    },
    {
        label: "Profile",
        to: `/snippets/${data.value?.username}`
    },
    {
        label: "Logout",
        click: () => {
            signOut({ callbackUrl: "/login" })
            toast.add({ title: "You have been logged out. Goodbye!", color: "green" })
        }
    }])

function onSearchSubmit() {
    navigateTo(`/search?q=${searchTerms.value}`)
    searchTerms.value = ""
}

</script>

<style lang="scss" scoped></style>