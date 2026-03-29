import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient
declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}
declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var $prisma: PrismaClient
  namespace NodeJS {
    // eslint-disable-next-line no-unused-vars
    interface Global {
      $prisma: PrismaClient
    }
  }
}

export default eventHandler((event) => {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  event.context.prisma = prisma
  globalThis.$prisma = prisma
})
