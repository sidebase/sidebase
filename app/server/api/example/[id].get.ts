import { defineEventHandler } from 'h3'
import type { CompatibilityEvent } from 'h3'
import type { InferType } from 'yup'
import { object, string } from 'yup'
import { Example } from '~/server/database/entities/Example'
import { useParamsAs } from '~/server/helpers'

const paramsSchema = object({
  id: string().uuid().required(),
})
export declare type Params = InferType<typeof paramsSchema>

export default defineEventHandler(async (event: CompatibilityEvent) => {
  const params: Params = await useParamsAs(event, paramsSchema)

  return Example.findOneOrThrow({ where: { id: params.id } })
})
