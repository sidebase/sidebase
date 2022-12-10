import { describe, expect, it } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'
import dayjs from 'dayjs'

await setup({
  server: true,
  browser: false
})

describe('GET /api/healthz', () => {
  it('should return the current health status', async () => {
    const response = await $fetch('/api/healthz')
    expect(Object.keys(response).sort()).toEqual(['nuxtAppVersion', 'startupTime', 'status', 'time'].sort())

    expect(response.nuxtAppVersion).toEqual('0.0.1')
    expect(response.status).toEqual('healthy')

    expect(dayjs(response.startupTime).isValid()).toBe(true)
    expect(dayjs(response.time).isValid()).toBe(true)
    expect(dayjs(response.startupTime) < dayjs(response.time))
  })
})
