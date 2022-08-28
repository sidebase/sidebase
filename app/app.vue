<script setup lang="ts">
import { ref } from 'vue'

import './assets/css/tailwind.css'

// NOTE: Typehints for `data` should work (although it's coming from the API!!). If they
//       do not work please debug your editor setup
const { data, refresh, pending, error } = await useFetch('/api/healthz')

let refreshDataInterval: null | ReturnType<typeof setInterval> = null
onMounted(() => {
  refreshDataInterval = setInterval(refresh, 2000)
})

onBeforeMount(() => {
  if (refreshDataInterval) {
    clearInterval(refreshDataInterval)
  }
})

const ratingValue = ref(5)
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <Head>
      <Title>SideBase</Title>
    </Head>
    <div class="flex flex-col">
      <h1 class="text-xl ">
        Welcome to the SideBase Nuxt 3 Fullstack Scaffold.
      </h1>
      <p>We rate this scaffold with:</p>
      <a-rate v-model:value="ratingValue" class="mx-auto my-8" />
      <div v-if="!error">
        <p>Live backend service status is:</p>
        <a-divider />
        <a-list>
          <a-list-item>Status: {{ data.status }}</a-list-item>
          <a-list-item>Time: {{ data.time }}</a-list-item>
          <a-list-item>Startup Time: {{ data.startupTime }}</a-list-item>
          <a-list-item>Version: {{ data.nuxtAppVersion }}</a-list-item>
        </a-list>
      </div>

      <p v-else class="font-bold">
        An error occured. Health status could not be requested.
      </p>
    </div>
  </div>
</template>
