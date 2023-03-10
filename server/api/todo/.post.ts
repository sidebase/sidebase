export default eventHandler(async (event) => {
  const body = await readBody(event)
  return event.context.prisma.todo.create({
    data: {
      ...body
    }
  })
})
