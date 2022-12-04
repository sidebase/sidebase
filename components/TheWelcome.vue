<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { HealthCheckData } from '~/server/api/healthz.get'

const props = defineProps({
  healthCheckData: {
    type: Object as PropType<HealthCheckData | null>,
    required: true
  },
  lastRefreshedAt: {
    type: Object as PropType<Date>,
    required: true
  }
})

const parsedHealthCheckData = computed(() => {
  if (!props.healthCheckData) {
    return null
  }

  const data = props.healthCheckData
  return {
    ...data,
    time: new Date(data.time),
    startupTime: new Date(data.startupTime)
  }
})
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <Head>
      <Title>sidebase</Title>
    </Head>
    <div class="flex w-4/6 max-w-lg flex-col">
      <h1 class="text-4xl">
        Welcome to <a href="https://github.com/sidebase/sidebase" target="_blank" class="GradientText">sidebase</a>!
      </h1>
      <p><a href="https://github.com/sidebase/sidebase" target="_blank" class="GradientText">sidebase</a> is the productive Nuxt 3 stack. It comes with batteries included: Tailwind, Naive UI, Testing, DB ORM, API examples, authentication module, session module, ... are all there.</p>
      <p class="my-4">
        The data you see below is fetched from an API that is connected to a running database.
      </p>
      <NTimeline v-if="parsedHealthCheckData">
        <NTimelineItem type="success" :title="`Server v${parsedHealthCheckData.nuxtAppVersion} initialized`" />
        <NTimelineItem type="success" :title="`Started at ${parsedHealthCheckData.startupTime.toLocaleString()}`" />
        <NTimelineItem type="info" title="Healthy" :content="`Last checked at ${parsedHealthCheckData.time.toLocaleString()}`" />
      </NTimeline>
      <NTimeline v-else>
        <NTimelineItem type="error" title="Server initialization failed" :content="`Last checked at ${lastRefreshedAt?.toLocaleString() || 'N/A'}`" />
      </NTimeline>
      <p class="my-4">
        The above status is updated every couple seconds. DB, App and Server all start with a single command: Use <b>npm run dev</b> to get going.
      </p>
    </div>
  </div>
</template>

<style>
.GradientText {
  background: linear-gradient(to right, #81F6D4 10%, #12a87b 40%, #0FCF97 60%, #81F6D4 90%);
  background-size: 200% auto;

  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: shine 1s linear infinite;
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
}
</style>
