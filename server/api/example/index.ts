import { usePrisma } from '@sidebase/nuxt-prisma'

export default eventHandler((event) => {
  const prisma = usePrisma(event)

  return prisma.example.findMany()
})
