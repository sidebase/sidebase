export default eventHandler((event) => {
  return event.context.prisma.todo.findMany()
})
