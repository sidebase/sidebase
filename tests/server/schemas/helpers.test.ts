import { afterEach, describe, expect, it, vi } from 'vitest'
import { z } from '@sidebase/nuxt-parse'
import { faker } from '@faker-js/faker'
import { transformStringToDate } from '~/server/schemas/helpers'

const fakeZodContext: z.RefinementCtx = {
  path: [''],
  addIssue: vi.fn(),
}

describe('transformStringToDate', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('correctly handles a valid ISO date-string', async () => {
    const date = new Date()
    expect(transformStringToDate(date.toISOString(), fakeZodContext)).toStrictEqual(date)
  })

  it('correctly handles an invalid string', async () => {
    const date = 'dsdsadasds'
    expect(transformStringToDate(date, fakeZodContext)).toStrictEqual(z.NEVER)
    expect(fakeZodContext.addIssue).toHaveBeenCalledWith({
      code: z.ZodIssueCode.custom,
      message: 'Not a valid date',
    })
  })

  it.each([
    faker.datatype.number(),
    true,
    false,
    undefined,
    null,
  ]) ('correctly handles an invalid data `%i`', async (data) => {
    // @ts-expect-error Passing an invalid type on purpose
    expect(transformStringToDate(data, fakeZodContext)).toStrictEqual(z.NEVER)
    expect(fakeZodContext.addIssue).toHaveBeenCalledWith({
      code: z.ZodIssueCode.custom,
      message: 'Not a valid date',
    })
  })
})
