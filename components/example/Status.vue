<script setup lang="ts">
import type { PropType } from 'vue'
import type { ResponseHealthcheck } from '~/server/schemas/healthz'

defineProps({
  statusCheck: {
    // Sadly the only way to get nullable & required props, see https://github.com/vuejs/core/issues/3948#issuecomment-860466204
    type: null as unknown as PropType<ResponseHealthcheck | null>,
    required: true,
  },
})
</script>

<template>
  <div>
    <div v-if="statusCheck">
      <div>
        Live backend service status is:
      </div>
      <table class="w-full table-fixed">
        <tbody>
          <tr>
            <td>
              Status
            </td>
            <td>{{ statusCheck.status }}</td>
          </tr>
          <tr>
            <td>Server time</td>
            <td>{{ statusCheck.time.toLocaleString() }}</td>
          </tr>
          <tr>
            <td>Startup Time</td>
            <td>{{ statusCheck.startupTime.toLocaleString() }}</td>
          </tr>
          <tr>
            <td>App version</td>
            <td>{{ statusCheck.nuxtAppVersion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="font-bold">
      An error occured. Health status could not be requested.
    </p>
  </div>
</template>
