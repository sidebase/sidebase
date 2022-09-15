import { z } from '@sidestream-tech/nuxt-sidebase-parse'

export const transformStringToDate = (val: string, ctx: z.RefinementCtx) => {
  const deserializedDate = Date.parse(val)
  if (isNaN(deserializedDate)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a valid date',
    })
    return z.NEVER
  }

  return new Date(deserializedDate)
}
