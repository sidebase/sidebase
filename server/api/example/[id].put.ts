import { usePrisma } from '@sidebase/nuxt-prisma'

export default eventHandler(async (event) => {
  const prisma = usePrisma(event)
  const { params } = event.context

  const id = params.id
  const body = await readBody(event)
  const data = {
    id,
    ...body
  }
  return prisma.example.upsert({ where: { id }, create: data, update: data })
})
