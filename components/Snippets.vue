<template>
    <div>
        <template v-if="results && (count != null ? count > 0 : false)">
            <Snippet v-for="s in results" :key="s?.id" :title="s.snippet_title" :language="s.language"
                :code="s.snippet_text" :username="s.username" :created-at="s.created_at" :desc="s.snippet_desc"
                :id="s.id" />
            <div class="flex justify-center py-2">
                <UPagination :page-count="5" :max="5"
                    :to="(page) => ({ path: `${route.path}`, query: { offset: (page - 1) * 5 } })"
                    :prev-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'Prev', color: 'gray' }"
                    :next-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', label: 'Next', color: 'gray' }"
                    :model-value="props.page" :total="props.count ?? 0"
                    />
            </div>
        </template>

        <template v-else>
            <h2>No snippets found</h2>
        </template>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const props = defineProps<{
    results: Snippet[]
    count: number
    next: string
    previous: string
    page: number
}>()


</script>


<style lang="scss" scoped></style>