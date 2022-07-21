import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { initialize } from '.'

export default defineNitroPlugin(async () => {
  console.log('DB: Initializing DB connection')

  try {
    await initialize()
  } catch (error) {
    console.trace('Error thrown during DB initialization, aborting startup', error)
    process.exit(-1)
  }

  console.log('DB: Successfully initialized database connection')
})
