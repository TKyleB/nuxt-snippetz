<template>
    <div>
        <template v-if="s">
            <h2 class="text-2xl font-bold pb-2">{{ s.snippet_title }}</h2>
            <hr>
            <Snippet :key="s.id" :title="s.snippet_title" :language="s.language" :code="s.snippet_text"
                :username="s.username" :created-at="s.created_at" :desc="s.snippet_desc" :id="s.id">
            </Snippet>
        </template>
        <template v-else>
            <h2>No snippet posted</h2>
        </template>
    </div>
</template>

<script setup>
const route = useRoute()

definePageMeta({
    auth: false
})

const { data: s } = useFetch(() => `http://localhost:8080/api/snippets/${route.params.snippet}`)
</script>

<style lang="scss" scoped></style>