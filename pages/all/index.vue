<template>
    <div>
        <h2 class="text-2xl font-bold pb-2">Recent Snippets</h2>
        <hr>
        <Snippets v-if="!error" :next="snippets?.next ?? ''" :previous="snippets?.previous ?? ''"
            :count="Number(snippets?.count) ?? 0" 
            :results="snippets?.results ?? {snippets: [], languages: {}}" 
            :page="page"
            :truncate="true"
            />

        <template v-else>
            <h2>No snippets found</h2>
        </template>


    </div>
</template>

<script setup lang="ts">
useHead({
    title: "All"
})
const route = useRoute()
const page = computed(() => (route.query.offset ? Number(route.query.offset) / 5 + 1 : 1))
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

definePageMeta({
    auth: false,
    scrollToTop: true
})

const { data: snippets, error } = await useFetch<SnippetsResponse>(() => `${apiBase}/api/snippets?offset=${(page.value - 1) * 5}`)

</script>

<style lang="scss" scoped></style>