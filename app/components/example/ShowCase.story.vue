<script setup lang="ts">
import { faker } from '@faker-js/faker'
import { hstEvent } from 'histoire/client'
import ShowCase from './ShowCase.vue'

const placeHolderEmpty = {
  nameInitialValue: '',
  namePlaceholder: undefined,
}

const withPlaceholder = {
  nameInitialValue: '',
  namePlaceholder: 'Enter your name...',
}

const prefilled = {
  nameInitialValue: faker.name.firstName(),
  namePlaceholder: '',
}

const submit = (formData: Object) => {
  hstEvent('Submitted', formData)
}
</script>

<template>
  <Story title="Show case of supported features">
    <Variant title="No Placeholder">
      <ShowCase class="bg-white" :name-initial-value="placeHolderEmpty.nameInitialValue" :name-placeholder="placeHolderEmpty.namePlaceholder" @submit="submit" />
    </Variant>
    <Variant title="With Placeholder">
      <ShowCase class="bg-white" :name-initial-value="withPlaceholder.nameInitialValue" :name-placeholder="withPlaceholder.namePlaceholder" @submit="submit" />
    </Variant>
    <Variant title="Prefilled">
      <ShowCase class="bg-white" :name-initial-value="prefilled.nameInitialValue" :name-placeholder="prefilled.namePlaceholder" @submit="submit" />
    </Variant>
  </Story>
</template>
