<script setup lang="ts">
import { faker } from '@faker-js/faker'
import { hstEvent } from 'histoire/client'
import ShowCase from './ShowCase.vue'

const placeHolderEmpty = {
  nameInitialValue: '',
  placeholder: undefined,
}

const withPlaceholder = {
  nameInitialValue: '',
  placeholder: 'Enter your name...',
}

const prefilled = {
  nameInitialValue: faker.name.firstName(),
  placeholder: '',
}

const submit = (formData: Object) => {
  hstEvent('Submitted', formData)
}
</script>

<template>
  <Story title="Show case of supported features">
    <Variant title="No Placeholder">
      <ShowCase class="bg-white" :name-initial-value="placeHolderEmpty.nameInitialValue" :placeholder="placeHolderEmpty.placeholder" @submit="submit" />
    </Variant>
    <Variant title="With Placeholder">
      <ShowCase class="bg-white" :name-initial-value="withPlaceholder.nameInitialValue" :placeholder="withPlaceholder.placeholder" @submit="submit" />
    </Variant>
    <Variant title="Prefilled">
      <ShowCase class="bg-white" :name-initial-value="prefilled.nameInitialValue" :placeholder="prefilled.placeholder" @submit="submit" />
    </Variant>
  </Story>
</template>
