<template>
  <form @submit.prevent="addTodoAndClear()">
    <input v-model="newTodo" type="text" class="p-4 w-full" placeholder="write a new todo ...">
  </form>
</template>

<script lang="ts" setup>
import { useTodoStore } from '~~/stores/TodoStore'
const store = useTodoStore()
const newTodo = ref('')
const addTodoAndClear = () => {
  if (newTodo.value.length !== 0) {
    store.addTodo(newTodo.value)
    newTodo.value = ''
  }
}
</script>
