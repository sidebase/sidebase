<script setup lang="ts">
import { ref } from 'vue'
import CloseIcon from '~/assets/icons/close.svg'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Your name...',
  },
})

defineEmits<{
  (e: 'submit', value: string): void
}>()
const value = ref<string>(props.modelValue)
</script>

<template>
  <div class="m-1">
    <h1>Form:</h1>
    <p>An ant design form that emits a submit on click to the button. Note that we use is via an "auto-import", we did not need to perform a manual import in the scripts section.</p>
    <form @submit.prevent="$emit('submit', value)">
      <div class="flex">
        <a-input v-model:value="value" :placeholder="placeholder" addon-before="Please enter your name:" />
        <a-button html-type="submit" type="primary">
          Submit
        </a-button>
      </div>
    </form>
    <div class="mt-2">
      <h1>Nuxt link:</h1>
      <p>This is a nuxt-link, a nuxt native component that we can easily use in histoire. To do so, we mocked it inside the `preview.js` - mock more nuxt native elements there if needed.</p>
      <nuxt-link to="/">
        Example link to somewhere
      </nuxt-link>
    </div>
    <div class="mt-2">
      <h1>Icon:</h1>
      <p>This is a svg-icon that was imported and turned into a pseudo-component, that we can style just like any other element.</p>
      <CloseIcon class="w-8" />
    </div>
  </div>
</template>
