import { eventHandler } from 'h3'
import { parseDataAs, z } from '@sidebase/nuxt-parse'
import { Example, exampleFull } from '~/server/database/entities/Example'

// Get all examples, then run them through parsing and validation to make sure that we do not expose sensitive properties on accident, e.g., `password`
export default eventHandler(async () => parseDataAs(Example.findMany(), z.array(exampleFull)))
