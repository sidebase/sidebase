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
      <Title>SIDESTREAM App</Title>
    </Head>
    <div class="flex flex-col">
      <h1 class="text-xl ">
        Welcome to the SIDESTREAM Nuxt 3 Fullstack Scaffold.
      </h1>
      <a-rate v-model:value="ratingValue" class="mx-auto my-8" />
      <a-spin v-if="pending" class="my-14" />
      <a-list v-else-if="!error">
        <a-list-item>Status: {{ data.status }}</a-list-item>
        <a-list-item>Time: {{ data.time }}</a-list-item>
        <a-list-item>Startup Time: {{ data.startupTime }}</a-list-item>
        <a-list-item>Version: {{ data.nuxtAppVersion }}</a-list-item>
      </a-list>
      <p v-else>
        An error occured. Health status could not be requested.
      </p>
    </div>
  </div>
</template>
