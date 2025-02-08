<template>
    <div>
        <h2 class="text-2xl font-bold pb-2">Search</h2>
        <hr>
        <div class="grid grid-cols-[15%_84%] gap-3">
            <UCard :ui="{base: 'mt-5 max-h-64', body: {padding: 'px-0 py-0 sm:p-3'}}">
                <h3>Languages</h3>
                <UButton v-for="(value, key) in snippets?.results.languages" class="p-1 flex w-full justify-between" variant="ghost"
                :to="{path: route.path, query: {q: route.query.q, language: key}}">
                        <div>{{ titleCase(key) }}</div>
                        <div>{{ value }}</div>
                </UButton>
            </UCard>
            <Snippets v-if="!error" :next="snippets?.next ?? ''"
            :previous="snippets?.previous ?? ''"
            :count="Number(snippets?.count) ?? 0"
            :results="snippets?.results ?? {snippets: [], languages: {}}" 
            :page="page"
            :truncate="true"
            :q="String(route.query.q)"
            />
            <template v-else>
                <h2>No snippets found</h2>
            </template>
            
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: "Search"
})
const page = computed(() => (route.query.offset ? Number(route.query.offset) / 5 + 1 : 1))
const route = useRoute()

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

definePageMeta({
    auth: false
})

const { data: snippets, error } = await useFetch<SnippetsResponse>(() => `${apiBase}/api/snippets?q=${route.query.q}&offset=${(page.value - 1) * 5}&language=${route.query.language ?? ''}`)


</script>

<style lang="scss" scoped></style>