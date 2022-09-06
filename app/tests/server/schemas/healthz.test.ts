import { describe, expect, it } from 'vitest'
import { responseSchemaHealthCheck } from '~/server/schemas/healthz'

describe('Healthz schema', () => {
  it('should work for parsing data', async () => {
    const resultCorrect = responseSchemaHealthCheck.safeParse({
      status: 'healthy',
      time: (new Date()).toString(),
      startupTime: (new Date()).toString(),
      nuxtAppVersion: 'unknown',
    })
    expect(resultCorrect.success).toBe(true)

    const resultIncorrectStatus = responseSchemaHealthCheck.safeParse({
      status: 'healthyy',
      time: (new Date()).toString(),
      startupTime: (new Date()).toString(),
      nuxtAppVersion: 'unknown',
    })
    expect(resultIncorrectStatus.success).toBe(false)

    const resultIncorrectDateIsNotString = responseSchemaHealthCheck.safeParse({
      status: 'healthy',
      time: new Date(),
      startupTime: (new Date()).toString(),
      nuxtAppVersion: 'unknown',
    })

    expect(resultIncorrectDateIsNotString.success).toBe(false)
  })
})
