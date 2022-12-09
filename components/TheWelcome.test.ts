import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/vue'
import TheWelcome from './TheWelcome.vue'
import type { HealthCheckData } from '~/server/api/healthz.get'

describe('TheWelcome', () => {
  test('displays all status values and intro messages', () => {
    const healthCheckData: HealthCheckData = {
      status: 'healthy',
      startupTime: new Date(2000, 1, 1, 13),
      time: new Date(2000, 1, 1, 14),
      nuxtAppVersion: '0.0.1'
    }

    const { getByText } = render(TheWelcome, { props: { healthCheckData, lastRefreshedAt: new Date() } })

    // Ensure some expected text is there:
    getByText('is the productive Nuxt 3 stack.', { exact: false })

    // Ensure all expected data is there:
    getByText(`Server v${healthCheckData.nuxtAppVersion} initialized`, { exact: false })
    getByText(`${healthCheckData.time.toLocaleString()}`, { exact: false })
    getByText(`${healthCheckData.startupTime.toLocaleString()}`, { exact: false })
    getByText(`${healthCheckData.nuxtAppVersion}`, { exact: false })

    // Error state should not be visible
    expect(() => getByText('Server initialization failed', { exact: false })).toThrowError()
  })

  test('displays failure when data is missing', () => {
    const { getByText } = render(TheWelcome, { props: { healthCheckData: null, lastRefreshedAt: new Date() } })

    // Ensure some expected text is there:
    getByText('is the productive Nuxt 3 stack.', { exact: false })

    // Ensure the error message is there
    getByText('Server initialization failed', { exact: false })

    // Success state should not be visible
    expect(() => getByText('Started at', { exact: false })).toThrowError()
  })
})
