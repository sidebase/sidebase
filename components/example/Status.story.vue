<script setup lang="ts">
import { faker } from '@faker-js/faker'
import Status from './Status.vue'
import type { ResponseHealthcheck } from '~/server/schemas/healthz'

const statusCheckSuccess: ResponseHealthcheck = {
  status: 'healthy',
  time: faker.date.recent(),
  startupTime: faker.date.past(),
  nuxtAppVersion: '1.0.0',
}
</script>

<template>
  <Story title="Status">
    <Variant title="Check failed">
      <Status class="bg-white" :status-check="null" />
    </Variant>
    <Variant title="Check success">
      <Status class="bg-white" :status-check="statusCheckSuccess" />
    </Variant>
  </Story>
</template>
