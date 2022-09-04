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
      <div>
        Live backend service status is:
      </div>
      <table class="table-fixed w-full">
        <tbody>
          <tr>
            <td class="w-1/3">
              Status
            </td>
            <td>{{ statusCheck.result.status }}</td>
          </tr>
          <tr>
            <td>Server time</td>
            <td>{{ statusCheck.result.time }}</td>
          </tr>
          <tr>
            <td>Startup Time</td>
            <td>{{ statusCheck.result.startupTime }}</td>
          </tr>
          <tr>
            <td>App version</td>
            <td>{{ statusCheck.result.nuxtAppVersion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="font-bold">
      An error occured. Health status could not be requested.
    </p>
  </div>
</template>
