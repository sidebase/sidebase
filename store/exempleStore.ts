export const useExempleStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    doubleCount: state => state.count * 2,
    getCount: state => state.count,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
