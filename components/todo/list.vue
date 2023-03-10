<template>
  <section class="h-screen w-screen justify-center items-center flex">
    <ul class="bg-gray-100 flex-row border-2 w-10/12 md:w-5/6 lg:w-1/2">
      <TodoAdd />
      <TodoRow v-for="(todo, index) in store.getTodos" :key="index" :todo="todo" />
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { useTodoStore } from '~~/stores/TodoStore'
const store = useTodoStore()
</script>
