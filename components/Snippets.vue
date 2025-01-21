<template>
    <div>
        <template v-if="results && (count != null ? count > 0 : false)">
            <Snippet v-for="s in results" :key="s?.id"
            :title="s.snippet_title"
            :language="s.language"
            :code="s.snippet_text"
            :username="s.username"
            :created-at="s.created_at"
            :desc="s.snippet_desc"
            :id="s.id"
            />
    </template>
    <template v-else>
        <h2>No snippets found</h2>
    </template>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    results: Snippet[]
    count: number
    next: string
    previous: string
}>()


</script>


<style lang="scss" scoped>

</style>