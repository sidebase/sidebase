import type { H3Event } from 'h3'

const startupTime = new Date()

const handler = eventHandler(async (event: H3Event) => {
  const prisma = event.context.prisma
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
