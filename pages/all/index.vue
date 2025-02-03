<template>
    <div>
        <h2 class="text-2xl font-bold pb-2">Recent Snippets</h2>
        <hr>
        <Snippets v-if="!error" :next="snippets?.next ?? ''" :previous="snippets?.previous ?? ''"
            :count="Number(snippets?.count) ?? 0" :results="snippets?.results ?? []" />
        <template v-else>
            <h2>No snippets found</h2>
        </template>
        <div class="flex justify-center py-2">
            <UPagination :page-count="5" :max="5" :to="(page) => ({ path: '/all', query: { offset: (page - 1) * 5 } })"
                :prev-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'Prev', color: 'gray' }"
                :next-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', label: 'Next', color: 'gray' }"
                :model-value="page" :total="snippets?.count ?? 0" />
        </div>

    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const page = computed(() => (route.query.offset ? Number(route.query.offset) / 5 + 1 : 1))

definePageMeta({
    auth: false,
    scrollToTop: true
})

const { data: snippets, error } = useFetch<SnippetsResponse>(() => `http://localhost:8080/api/snippets?offset=${(page.value - 1) * 5}`)

</script>

<style lang="scss" scoped></style>