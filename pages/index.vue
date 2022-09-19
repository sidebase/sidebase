<script setup lang="ts">
import { makeParser } from '@sidestream-tech/nuxt-sidebase-parse'
import { responseSchemaHealthCheck } from '~/server/schemas/healthz'
import SidebaseLogo from '~/assets/sidebase_logo_light_icon_font_white_bg_long.svg'

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
  <div class="flex h-screen items-center justify-center">
    <div class="flex w-4/6 max-w-lg flex-col">
      <SidebaseLogo class="w-72 fill-blue-200" />
      <h1 class="text-xl">
        Welcome to <a href="https://github.com/sidestream-tech/sidebase" target="_blank">sidebase</a>!
      </h1>
      <p>sidebase is a production ready, fullstack typescript nuxt 3 starter. It has a lot of batteries like testing, DB ORM, API examples, ... included. The data you see below is fetched from an API that is connected to a running database. DB, Frontend and Backend all start with a single command: <b>npm run dev</b></p>
      <p>Make this starter your own - this page is just a boring placeholder. We rate this scaffold with:</p>
      <a-rate v-model:value="ratingValue" />
      <example-status
        class="mt-5"
        :status-check="statusCheck"
      />
    </div>
  </div>
</template>
