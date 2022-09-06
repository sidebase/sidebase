import { createError, defineEventHandler } from 'h3'
import { AppDataSource } from '../database'
import type { ResponseHealthcheck } from '../schemas/healthz'

const startupTime = new Date()

export default defineEventHandler((): ResponseHealthcheck => {
  if (!AppDataSource.isInitialized) {
    console.error('Healthcheck failed: DB connection not initialized')
    throw createError({ statusCode: 500 })
  }

  return {
    status: 'healthy',
    time: new Date(),
    startupTime,
    nuxtAppVersion: process.env.NUXT_APP_VERSION || 'unknown',
  }
})
