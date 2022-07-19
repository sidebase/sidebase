<script setup lang="ts">
import { ref } from 'vue'

import './assets/css/tailwind.css'

const value = ref(5)
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <Head>
      <Title>SIDESTREAM App</Title>
    </Head>
    <div class="flex flex-col items-center">
      <p>
        SIDESTREAM Nuxt 3 Fullstack Scaffold
      </p>
      <p>
        You are rated as:
      </p>
      <a-rate v-model:value="value" />
    </div>
  </div>
</template>
