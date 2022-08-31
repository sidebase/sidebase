<script setup lang="ts">
import { faker } from '@faker-js/faker'
import { ref } from 'vue'
import { hstEvent } from 'histoire/client'
import TheComponent from './TheComponent.vue'

const placeHolderEmpty = ref({
  modelValue: '',
  placeholder: undefined,
})

const withPlaceholder = ref({
  modelValue: '',
  placeholder: 'Enter your name...',
})

const prefilled = ref({
  modelValue: faker.name.fullName(),
  placeholder: '',
})

const submit = ($event: string) => hstEvent('Submitted', $event)
</script>

<template>
  <Story title="The Component">
    <Variant title="No Placeholder">
      <TheComponent v-model="placeHolderEmpty.modelValue" :placeholder="placeHolderEmpty.placeholder" @submit="submit" />
    </Variant>
    <Variant title="With Placeholder">
      <TheComponent v-model="withPlaceholder.modelValue" :placeholder="withPlaceholder.placeholder" @submit="submit" />
    </Variant>
    <Variant title="Prefilled">
      <TheComponent v-model="prefilled.modelValue" :placeholder="prefilled.placeholder" @submit="submit" />
    </Variant>
  </Story>
</template>
