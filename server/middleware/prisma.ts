import { PrismaClient } from '@prisma/client'
import { eventHandler, H3Event } from 'h3'

let prisma: PrismaClient

declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

export const usePrisma = (event: H3Event) => event.context.prisma

export default eventHandler((event) => {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  event.context.prisma = prisma
})
