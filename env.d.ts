// for svgo
declare module '*.svg' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
