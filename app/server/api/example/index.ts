import { defineEventHandler } from 'h3'
import { z } from 'zod'
import { Example, exampleFull } from '~/server/database/entities/Example'
import { parseDataPromiseAs } from '~/server/helpers'

// Get all examples, then run them through parsing and validation to make sure that we do not expose sensitive properties on accident, e.g., `password`
export default defineEventHandler(async () => parseDataPromiseAs(Example.findMany(), z.array(exampleFull)))
