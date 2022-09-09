<script setup lang="ts">
import { makeParser } from '@sidestream-tech/nuxt-sidebase-parse'
import { responseSchemaHealthCheck } from '~/server/schemas/healthz'

const transform = makeParser(responseSchemaHealthCheck)
const { data: statusCheck, refresh } = await useFetch('/api/healthz', { transform })

let refreshDataInterval: null | ReturnType<typeof setInterval> = null
onMounted(() => {
  refreshDataInterval = setInterval(refresh, 2000)
})

onBeforeUnmount(() => {
  if (refreshDataInterval) {
    clearInterval(refreshDataInterval)
  }
})

const ratingValue = ref(5)
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="w-96 flex flex-col">
      <h1 class="text-xl">
        Welcome to <a href="https://github.com/sidestream-tech/sidebase" target="_blank">sidebase</a>!
      </h1>
      <p>We rate this scaffold with:</p>
      <a-rate v-model:value="ratingValue" />
      <example-status
        class="mt-5"
        :status-check="statusCheck"
      />
    </div>
  </div>
</template>
