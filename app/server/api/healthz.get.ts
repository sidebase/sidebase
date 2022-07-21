import { createError, defineEventHandler } from 'h3'
import { AppDataSource } from '../database'

export default defineEventHandler(() => {
  if (!AppDataSource.isInitialized) {
    console.error('Healthcheck failed: DB connection not initialized')
    throw createError({ statusCode: 500 })
  }

  return 'healthy'
})
