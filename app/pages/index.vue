<script setup lang="ts">
const { data, refresh, error } = await useFetch('/api/healthz')
const statusCheckResult = computed(() => {
  if (error.value) {
    return {
      error: error.value,
      result: null,
    }
  }

  return {
    error: null,
    result: data.value,
  }
})

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
    <div class="w-96 flex flex-col">
      <h1 class="text-xl">
        Welcome to <a href="https://github.com/sidestream-tech/sidebase" target="_blank">SideBase</a>!
      </h1>
      <p>We rate this scaffold with:</p>
      <a-rate v-model:value="ratingValue" class="mx-auto my-8" />
      <example-status
        class="mt-5"
        :status-check="statusCheckResult"
      />
    </div>
  </div>
</template>
