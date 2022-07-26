import { defineEventHandler } from 'h3'
import { Example } from '~/server/database/entities/Example'

export default defineEventHandler(async () => Example.findManyOrThrow())
