<script setup lang="ts">
import type { PropType } from 'vue'
import type { StatusCheckResult } from '~/types'

defineProps({
  statusCheck: {
    type: Object as PropType<StatusCheckResult>,
    required: true,
  },
})
</script>

<template>
  <div>
    <div v-if="!statusCheck.error">
      <p>Live backend service status is:</p>
      <a-divider />
      <a-list>
        <a-list-item>Status: {{ statusCheck.result.status }}</a-list-item>
        <a-list-item>Time: {{ statusCheck.result.time }}</a-list-item>
        <a-list-item>Startup Time: {{ statusCheck.result.startupTime }}</a-list-item>
        <a-list-item>Version: {{ statusCheck.result.nuxtAppVersion }}</a-list-item>
      </a-list>
    </div>

    <p v-else class="font-bold">
      An error occured. Health status could not be requested.
    </p>
  </div>
</template>
