import { defineEventHandler } from 'h3'
import { parseDataAs, z } from '@sidestream-tech/nuxt-sidebase-parse'
import { Example, exampleFull } from '~/server/database/entities/Example'

// Get all examples, then run them through parsing and validation to make sure that we do not expose sensitive properties on accident, e.g., `password`
export default defineEventHandler(async () => parseDataAs(Example.findMany(), z.array(exampleFull)))
