<template>
    <div class="pt-16">
        <h2 class="text-5xl font-bold text-center">New Snippet</h2>
        <div class="flex justify-center">
        <UForm :state="state" class="space-y-4 w-full">
            <UFormGroup label="Title" name="desc" class="w-full" size="xl">
              <UInput size="xl" v-model="state.title" required/>
            </UFormGroup>
        <div class="flex">
            <UFormGroup label="Description" name="desc" class="w-full" size="xl">
              <UInput size="xl" v-model="state.desc" required/>
            </UFormGroup>
            <UFormGroup label="Language" name="language" size="xl" class="w-96">
              <USelect v-model="state.language" :options="languages" size="xl" autoresize required/>
            </UFormGroup>
        </div>
        <MonacoEditor class="min-h-96" v-model="state.text" v-bind:lang="state.language.toLowerCase()" :options="{ theme: 'vs-dark', minimap: {enabled: false}}"/>
        <div v-if="errors.code">
                <UAlert
                    color="red"
                    variant="solid"
                    description="This field is required"
                    class="mt-5 font-bold text-center"
                  />
            </div>
        <UButton type="submit" v-on:click="handleSubmit" class="flex w-full justify-center text-lg" color="green">
          Submit
        </UButton>
          </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">

const { token } = useAuth()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

definePageMeta({
    auth: {
        unauthenticatedOnly: false,
        navigateUnauthenticatedTo: '/all'
    }
})
const languages = ["Go", "Python", "Java", "Javascript", "SQL", "Text"]
const state = {
    desc: "",
    language: "",
    text: "",
    title: ""

}
const errors = {
  code:false
}

async function handleSubmit() {
  
  if (state.text == "") {
    errors.code = true
    return
  }
  try{
  const res = await $fetch<Snippet>(`${apiBase}/api/snippets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token.value}`
    },
    body: JSON.stringify({
      language: state.language.toLowerCase(),
      snippet_text: state.text,
      snippet_desc: state.desc,
      snippet_title: state.title
    })
  })
  return navigateTo(`/snippets/${res.username}/${res.id}`)
} catch (e) {
  console.log(e)
}
}
</script>

<style lang="scss" scoped>

</style>