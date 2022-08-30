import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { initialize } from '../database'

export default defineNitroPlugin(async () => {
  console.log('DB: Initializing DB connection')
  try {
    await initialize()
  } catch (error) {
    console.trace('Error thrown during DB initialization, aborting startup', error)
    throw new Error('DB: Cancelling startup, as DB initialization failed')
  }

  console.log('DB: Successfully initialized database connection')
})
