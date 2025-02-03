<template>
    <div>
        <h2 class="text-2xl font-bold pb-2">{{ route.params.username }}'s Snippets</h2>
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
definePageMeta({
    auth: false
})

const { data: snippets, error } = useFetch<SnippetsResponse>(() => `http://localhost:8080/api/snippets?username=${route.params.username}&offset=${(page.value - 1) * 5}`)
</script>

<style lang="scss" scoped></style>