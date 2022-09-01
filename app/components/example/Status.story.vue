<script setup lang="ts">
import { faker } from '@faker-js/faker'
import Status from './Status.vue'
import type { StatusCheckResult } from '~/types'

const statusCheckFail: StatusCheckResult = {
  error: true,
  result: null,
}

const statusCheckSuccess: StatusCheckResult = {
  error: null,
  result: {
    status: 'healthy',
    time: faker.date.recent(),
    startupTime: faker.date.past(),
    nuxtAppVersion: '1.0.0',
  },
}
</script>

<template>
  <Story title="Status">
    <Variant title="Check failed">
      <Status class="bg-white" :status-check="statusCheckFail" />
    </Variant>
    <Variant title="Check success">
      <Status class="bg-white" :status-check="statusCheckSuccess" />
    </Variant>
  </Story>
</template>
