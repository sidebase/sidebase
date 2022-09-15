// Types for histoire
/// <reference types="@histoire/plugin-vue/components" />
// Types for nuxt, to avoid reload
/// <reference types="nuxt" />
// To get correct types for `svg`s
declare module '*.svg' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
