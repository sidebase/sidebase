import type { H3Event } from 'h3'
import { usePrisma } from '@sidebase/nuxt-prisma'

export default eventHandler((event: H3Event) => {
  const prisma = usePrisma(event)

  return prisma.example.findMany()
})
