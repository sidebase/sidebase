import { describe, expect, it } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'
import { expectNoClientErrors } from './utils'

await setup({
  server: true,
  browser: true
})

describe('app', () => {
  it('renders welcome page', async () => {
    const html = await $fetch('/')

    // Shows expected text
    expect(html).toContain('is the productive Nuxt 3 stack')

    // Contains data from healthcheck endpoint
    expect(html).toContain('Server v0.0.1 initialized')
    expect(html).toContain('Started at ')
    expect(html).toContain('Last checked at ')

    await expectNoClientErrors('/')
  })
})
