import { usePrisma } from '@sidebase/nuxt-prisma'

export default eventHandler(async (event) => {
  const prisma = usePrisma(event)
  const { params } = event.context

  const example = await prisma.example.findFirst({ where: { id: params.id } })
  if (!example) {
    throw createError({ statusCode: 404, statusMessage: `Failed to find example with id ${params.id}` })
  }

  return example
})
