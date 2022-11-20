import path from 'path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import svgLoader from 'vite-svg-loader'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

// Overwrite `apply` of `plugin-vue` so that it
// only applies on `test` mode. Otherwise `npm run build` will fail
// with:
// ```sh
//  ERROR  Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).
// ```
// Read for apply: https://vitejs.dev/guide/api-plugin.html#conditional-application
const pluginVue = Vue()
pluginVue.apply = (_, { mode }: { mode: string }) => {
  // apply only on `test` so that `vitest` understands vue. Else `vitest` will say:
  // ```sh
  // Error: Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.
  // ```
  // guess: because nuxt already applies its own template transformation
  return mode === 'test'
}

const include = [/\.vue$/, /\.vue\?vue/, /\.stories\.ts$/, /\.[tj]s$/]

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
    },
  },
  plugins: [
    // Make composable, components and ant-design imports work inside `vitest`
    pluginVue,
    Components({
      dirs: ['~/components'],
      directoryAsNamespace: true,
      resolvers: [AntDesignVueResolver()],
      include,
    }),
    AutoImport({
      include,
      imports: ['vue'],
      dirs: ['~/composables'],
      vueTemplate: true,
    }),
    svgLoader(),
  ],
  // Make `ant-design-vue` work as at the moment there's still problems with Vite SSR + ant design,
  // see [this for source of fix](https://github.com/vueComponent/ant-design-vue/discussions/5210)
  // and [reported but unresolved here](https://github.com/vueComponent/ant-design-vue/issues/3997).
  // For latest occurence + resolution see here: https://github.com/nuxt/framework/issues/6941#issuecomment-1229739856
  ssr: {
    noExternal: ['moment', 'compute-scroll-into-view', 'ant-design-vue', '@ant-design/icons-vue', 'dayjs'],
  },
  // vitest configuration
  // see https://vitest.dev/config/
  test: {
    threads: false,
    environment: 'jsdom',
    coverage: {
      enabled: true,
      lines: 90,
      functions: 90,
      branches: 90,
      // We want to catch all js/ts/... files, not only the ones imported in some tests
      // see https://github.com/bcoe/c8#checking-for-full-source-coverage-using---all
      all: true,
      include: [
        // Nuxt 3 framework folders and files sources from directory structure here: https://v3.nuxtjs.org/guide/concepts/introduction
        'assets',
        'components',
        'composables',
        'layouts',
        'middleware',
        'pages',
        'public',
        'server',
        'app.vue',
      ],
      exclude: ['**/*.story.vue', '**/*.test.ts', 'app.vue', 'pages/**/*.vue', 'server/database/index.ts'],
    },
    deps: {
      // `ant-design-vue` breaks vitest unless we inline it here,
      // because the `ant-design-vue` library does not properly
      // define its JS-style (CommonJS es ESM)
      inline: [
        'ant-design-vue',
      ],
    },
    setupFiles: [
      './tests/setupTestUtils.ts',
    ],
  },
})
