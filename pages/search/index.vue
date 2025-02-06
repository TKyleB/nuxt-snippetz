<template>
    <div>
        <h2 class="text-2xl font-bold pb-2">Search</h2>
        <hr>
        <Snippets v-if="!error" :next="snippets?.next ?? ''" :previous="snippets?.previous ?? ''"
            :count="Number(snippets?.count) ?? 0" :results="snippets?.results ?? []" :page="page" />
        <template v-else>
            <h2>No snippets found</h2>
        </template>
    </div>
</template>

<script setup lang="ts">
const page = computed(() => (route.query.offset ? Number(route.query.offset) / 5 + 1 : 1))
const route = useRoute()

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

definePageMeta({
    auth: false
})

const { data: snippets, error } = useFetch<SnippetsResponse>(() => `${apiBase}/api/snippets?q=${route.query.q}`)

</script>

<style lang="scss" scoped></style>