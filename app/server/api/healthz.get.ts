import { createError, defineEventHandler } from 'h3'
import { z } from '@sidestream-tech/nuxt-sidebase-parse'
import { AppDataSource } from '../database'

const startupTime = new Date()
export const responseSchemaHealthCheck = z.object({
  status: z.literal('healthy'),
  time: z.date(),
  startupTime: z.date(),
  nuxtAppVersion: z.string(),
})

export type ResponseHealthcheck = z.infer<typeof responseSchemaHealthCheck>

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
