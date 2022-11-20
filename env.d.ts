// Types for nuxt, to avoid volar-reload after `nuxi prepare`, see https://github.com/nuxt/framework/issues/7544#issuecomment-1247920103
/// <reference types="nuxt" />
// To get correct types for `svg`s
declare module '*.svg' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
