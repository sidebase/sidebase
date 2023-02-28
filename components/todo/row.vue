<template v-if="isActive">
  <li class="hover:bg-green-100 px-8 py-4 flex justify-between">
    <NCheckbox
      v-if="!editMode"
      :checked="todo.isDone"
      :label="todo.content"
      size="large"
      class="grow"
      @update:checked="toggleDone(todo)"
    />
    <input
      v-if="editMode"
      ref="editinput"
      v-model="newContent"
      class="grow px-2"
      type="text"
      @focusout="updateContent(todo)"
      @keypress.enter="updateContent(todo)"
    >
    <div class="flex justify-around w-24">
      <NButton type="warning" @click="editTodo()">
        🖊️
      </NButton>
      <NButton type="error" @click="store.dropTodo(todo)">
        🗑
      </NButton>
    </div>
  </li>
</template>

<script lang="ts" setup>
import Todo from 'types/todo'
import { useTodoStore } from '~~/stores/TodoStore'
const store = useTodoStore()
interface Props {
  todo: Todo
}
const props = defineProps<Props>()
const editMode = ref(false)
const newContent = ref(props.todo.content)
const editinput = ref<HTMLInputElement>()
const toggleDone = (todo: Todo) => {
  todo.isDone = !todo.isDone
  store.updateTodo(todo)
}
const editTodo = () => {
  editMode.value = !editMode.value
  nextTick(() => {
    editinput.value?.focus()
  })
}
const updateContent = (todo: Todo) => {
  todo.content = newContent.value
  store.updateTodo(todo)
  editMode.value = !editMode
}
</script>

<style>
.n-checkbox--checked .n-checkbox__label {
  @apply line-through opacity-50;
}
</style>
