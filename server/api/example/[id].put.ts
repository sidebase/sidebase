export default eventHandler(async (event) => {
  const { params, prisma } = event.context

  const id = params.id
  const body = await readBody(event)
  const data = {
    id,
    ...body
  }
  return prisma.example.upsert({ where: { id }, create: data, update: data })
})
