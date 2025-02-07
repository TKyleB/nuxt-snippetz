<template>
  <UCard class="w-full mt-5"
    :ui="{ body: { padding: 'sm:p-3 p-0', background: 'bg-slack-dark', }, header: { padding: 'sm:px-3 py-2' }, footer: { padding: 'sm:px-3 py-2' } }">
    <template #header>
      <div class="flex justify-between">
        <div>
          <div>
            <ULink active-class="text-green-500" inactive-class="text-primary" :to="'/snippets/' + props.username">
              {{props.username }}
            </ULink>
             / 
             <ULink inactive-class="text-primary" active-class="text-green-500" :to="'/snippets/' + props.username + '/' + props.id">
              {{ props.title + generateFileExtension(props.language) }}
            </ULink>
          </div>
          <div class="text-xs">Created {{ new Date(props.createdAt).toLocaleString("en-US", {
            day: "numeric", month:
              "long", year: "numeric"
          }) }}</div>
        </div>
        <UTooltip text="Copy to clipboard">
          <UButton size="sm" variant="ghost" icon="material-symbols:content-copy" @click="() => copyCode(props.code)">
          </UButton>
        </UTooltip>
      </div>
    </template>
    <Shiki v-if="props.truncate" :lang:any="props.language" :code="props.code?.split('\n').slice(0, 10).toString()" :unwrap="false" class="code-container"/>
    <Shiki v-else :lang:any="props.language" :code="props.code" :unwrap="false" class="code-container"/>
    <template #footer>
      <div class="flex justify-between">
        <div>{{ props.desc }}</div>
        <div v-if="status == 'authenticated'">
          <UTooltip text="Delete" v-if="data?.username == props.username">
            <UButton @click="handleDeleteButton" size="sm" variant="ghost"
              icon="material-symbols:delete-outline" color="red">
            </UButton>
          </UTooltip>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const toast = useToast()

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const { status, data, token } = useAuth()
const props = defineProps({
  username: String,
  language: { type: String, required: true },
  code: String,
  createdAt: { type: String, required: true },
  title: {type: String, required: true},
  desc: String,
  id: { type: String, required: true },
  truncate: {type: Boolean, required: true}

})

function copyCode(text: string | undefined) {
  if (text == undefined) {
    return;
  }
  navigator.clipboard.writeText(text)
  toast.add({ title: 'Copied to clipboard' })
}
async function handleDeleteButton() {
  try {
    const res = await $fetch(`${apiBase}/api/snippets/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token.value}`
      }
    })
    toast.add({ title: `Snippet: ${props.title} deleted`, color: "red" })
    return refreshNuxtData()
  } catch (e) {
    console.log(e)
  }

}

function generateFileExtension(language: string): String {
  switch(language) {
    case "javascript":
      return ".js"
    case "python":
      return ".py"
    case "go":
      return ".go"
    case "sql":
      return ".sql"
    case "text":
      return ".txt"
    default:
      return ""
  }
}

</script>

<style scoped>
.code-container {
  overflow-x: auto;
  max-height: 500px;
  background-color: #222222;
}

</style>