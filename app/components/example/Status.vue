<script setup lang="ts">
import type { PropType } from 'vue'
import type { ResponseHealthcheck } from '~/server/api/healthz.get'

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
      <table class="table-fixed w-full">
        <tbody>
          <tr>
            <td class="w-1/3">
              Status
            </td>
            <td>{{ statusCheck.status }}</td>
          </tr>
          <tr>
            <td>Server time</td>
            <td>{{ statusCheck.time }}</td>
          </tr>
          <tr>
            <td>Startup Time</td>
            <td>{{ statusCheck.startupTime }}</td>
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
