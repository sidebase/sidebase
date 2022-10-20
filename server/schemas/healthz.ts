import { z } from '@sidebase/nuxt-parse'
import { transformStringToDate } from './helpers'

export const responseSchemaHealthCheck = z.object({
  status: z.literal('healthy'),
  time: z.string().transform(transformStringToDate),
  startupTime: z.string().transform(transformStringToDate),
  nuxtAppVersion: z.string(),
})

export type ResponseHealthcheck = z.infer<typeof responseSchemaHealthCheck>
