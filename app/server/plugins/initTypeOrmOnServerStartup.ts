import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { initialize } from '../database'

export default defineNitroPlugin(async () => initialize())
