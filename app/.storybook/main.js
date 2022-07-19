const { loadConfigFromFile, mergeConfig } = require('vite')

module.exports = {
  stories: [
    "../components/**/*.stories.@(ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true
  },
  features: {
    storyStoreV7: true
  },
  typescript: {
    check: true,
    checkOptions: {
      strict: true
    }
  },
  async viteFinal(config, { configType }) {
    const { config: rootConfig } = await loadConfigFromFile('../vite.config.ts')
    const mergedConfig = mergeConfig(config, rootConfig)
    return mergedConfig;
  },
}
