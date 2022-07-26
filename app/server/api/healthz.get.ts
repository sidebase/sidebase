import { createError, defineEventHandler } from 'h3'
import { AppDataSource } from '../database'

const startupTime = new Date()
export declare interface Response {
  status: 'healthy'
  time: Date
  startupTime: Date
  nuxtAppVersion: string | 'unknown'
}

export default defineEventHandler((): Response => {
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
