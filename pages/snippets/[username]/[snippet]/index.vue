<template>
    <div>
        <template v-if="s">
            <h2 class="text-2xl font-bold pb-2">{{ s.snippet_title }}</h2>
            <hr>
            <Snippet :key="s.id" :title="s.snippet_title" :language="s.language" :code="s.snippet_text"
                :username="s.username" 
                :created-at="s.created_at" 
                :desc="s.snippet_desc" 
                :id="s.id"
                :truncate="false"
                >
            </Snippet>
        </template>
        <template v-else>
            <h2>No snippet posted</h2>
        </template>
    </div>
</template>

<script setup>
const route = useRoute()

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

definePageMeta({
    auth: false
})
const { data: s } = await useFetch(`${apiBase}/api/snippets/${route.params.snippet}`)
useHead({
    title: () => s.snippet_title
})
</script>

<style lang="scss" scoped></style>