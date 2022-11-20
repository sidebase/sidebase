import { eventHandler } from 'h3'
import type { H3Event } from 'h3'
import { parseBodyAs, parseDataAs, parseParamsAs, z } from '@sidebase/nuxt-parse'
import { Example, exampleFull, exampleUpdate } from '~/server/database/entities/Example'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export default eventHandler(async (event: H3Event) => {
  // Parse the request parameters (so the dynamic data that is part of the URL, e.g.: `/example/1` where `1` is the id)
  const params = parseParamsAs(event, paramsSchema)

  // Find the requested entity to then later update it. This method will correctly throw a `404` HTTP error if no entity is found
  const exampleToUpdate = await Example.findOneOrThrow({ where: { id: params.id } })

  // Parse the payload using the update schema. The parsing is important to avoid bad, incorrect or malicious data coming in
  const payload = await parseBodyAs(event, exampleUpdate)

  // Update the found database-record using the payload
  const updatedExample = await exampleToUpdate.update(payload)

  // Return the full database-record after also passing it through a parsing step. This step is important as we:
  // - might not want to return _all_ fields in the response, e.g., we might want to exclude internal meta-data fields like `createdAt` or secret fields like `password`,
  // - might make a mistake in the code above where we would return totally different data by accident. This could go into production unnoticed and can be avoided like this
  return parseDataAs(updatedExample, exampleFull)
})
