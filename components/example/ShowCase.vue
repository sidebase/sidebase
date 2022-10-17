<script setup lang="ts">
import CloseIcon from '~/assets/icons/close.svg'

const props = defineProps({
  nameInitialValue: {
    type: String,
    required: true,
  },
  namePlaceholder: {
    type: String,
    default: 'Your name...',
  },
})

const emits = defineEmits<{
  (e: 'submit', value: { name: string }): undefined
}>()
const name = ref<string>(props.nameInitialValue)
</script>

<template>
  <div class="p-1">
    <h1>Form:</h1>
    <p>An ant design form that emits a submit on click to the button. Note that we use is via an "auto-import", we did not need to perform a manual import in the scripts section.</p>
    <form @submit.prevent="() => emits('submit', { name })">
      <div class="flex">
        <a-input v-model:value="name" :placeholder="namePlaceholder" addon-before="Please enter your name:" />
        <a-button html-type="submit" type="primary">
          Submit
        </a-button>
      </div>
    </form>
    <div class="mt-2">
      <h1>Icon:</h1>
      <p>This is a svg-icon that was imported and turned into a pseudo-component, that we can style just like any other element.</p>
      <CloseIcon class="w-24 fill-blue-200" />
    </div>
  </div>
</template>
