export default eventHandler(async (event) => {
  const body = await readBody(event)
  return event.context.prisma.todo.update({
    where: {
      id: body.id
    },
    data: {
      ...body
    }
  })
})
