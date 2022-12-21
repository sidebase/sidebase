import type { H3Event } from 'h3'
import { usePrisma } from '@sidebase/nuxt-prisma'

const startupTime = new Date()

const handler = eventHandler(async (event: H3Event) => {
  const prisma = usePrisma(event)
  try {
    await prisma.$queryRaw`SELECT 1;`
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'DB failed initialization check' })
  }

  return {
    status: 'healthy',
    time: new Date(),
    startupTime,
    nuxtAppVersion: useRuntimeConfig().version || 'unknown'
  }
})

export type HealthCheckData = Awaited<ReturnType<typeof handler>>
export default handler
