import { setAbsoluteSqliteDatabaseUrlForPrisma } from '@sidebase/nuxt-prisma'

setAbsoluteSqliteDatabaseUrlForPrisma()

export default defineNuxtConfig({
  runtimeConfig: {
    version: '0.0.1'
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-svgo', '@huntersofbook/naive-ui-nuxt'],
  extends: ['@sidebase/nuxt-prisma']
})
