import { z } from '@sidebase/nuxt-parse'

export const transformStringToDate = (val: string, ctx: z.RefinementCtx) => {
  // Ensure that `val` is a string, as this transformer could be called with any data at runtime
  if (typeof val !== 'string') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a valid date',
    })
    return z.NEVER
  }

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
