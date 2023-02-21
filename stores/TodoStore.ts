import Todo from 'types/todo'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[]
  }),
  getters: {
    getTodos (state) {
      state.todos = useFetch('/api/todo').data.value as Todo[]
      return state.todos
    }
  },
  actions: {
    async addTodo (toAdd: string) {
      const { data: newTodo } = await useFetch('/api/todo/', { method: 'post', body: { content: toAdd } })
      this.todos.push(newTodo.value as Todo)
    },
    dropTodo (toDrop: Todo) {
      if (toDrop.id) {
        useFetch('/api/todo/', { method: 'delete', body: { id: toDrop.id } })
        this.todos = this.todos.filter(todo => todo.id !== toDrop.id)
      }
    },
    updateTodo (toUpdate: Todo) {
      let todo = this.todos.find(todo => todo.id === toUpdate.id)
      todo = { ...toUpdate }
      useFetch('api/todo/', { method: 'put', body: { ...todo } })
    }
  }
})
