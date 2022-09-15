import { isProduction } from './helpers'

// Needed to keep `ant-design-vue` running as of latest RC.8, see https://github.com/nuxt/framework/issues/6941#issuecomment-1229739856
const transpile = ['lodash-es']
if (isProduction) {
  // For production build via rollup, we need to also transpile babel
  transpile.push('@babel/runtime')
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // Needed to keep `ant-design-vue` running as of latest RC.8, see https://github.com/nuxt/framework/issues/6941#issuecomment-1229739856
  alias: {
    dayjs: 'dayjs/esm/',
  },
  typescript: {
    // We enable `Volar Takeover Mode`, so we can disable the shim `*.vue` generation
    // see https://v3.nuxtjs.org/getting-started/introduction#prerequisites
    shim: false,
    strict: true,
  },
  build: {
    transpile,
  },
  modules: ['@nuxtjs/tailwindcss'],
})
