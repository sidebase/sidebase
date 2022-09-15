import { afterEach, describe, expect, test, vi } from 'vitest'
import Status from './Status.vue'
import { render } from '~/tests/testingLibraryVue'
import type { ResponseHealthcheck } from '~/server/schemas/healthz'

describe('Status', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('mounts and is still the same for fail variant', () => {
    const { html } = render(Status, { props: { statusCheck: null } })
    expect(html()).toMatchSnapshot()
  })

  test('mounts and is still the same for success variant', () => {
    const timeToUse = new Date(2000, 1, 1, 14)
    const timeToUseAsFixedLocale = timeToUse.toLocaleString('en-US')
    const fakeStatusCheckSuccess: ResponseHealthcheck = {
      status: 'healthy',
      startupTime: timeToUse,
      time: timeToUse,
      nuxtAppVersion: 'v0.0.1',
    }

    // Render with mocked locale, so that formatting is also the same in CI / on different continents / ...
    vi.spyOn(global.Date.prototype, 'toLocaleString').mockImplementation(() => timeToUseAsFixedLocale)
    const { html } = render(Status, { props: { statusCheck: fakeStatusCheckSuccess } })

    expect(html()).toMatchSnapshot()
  })

  test('displays all status values', async () => {
    const statusCheck: ResponseHealthcheck = {
      status: 'healthy',
      startupTime: new Date(2000, 1, 1, 13),
      time: new Date(2000, 1, 1, 14),
      nuxtAppVersion: 'v0.0.1',
    }

    const { getByText } = render(Status, { props: { statusCheck } })

    // Ensure all expected text is there:
    getByText('Live backend service status is:')
    getByText('Status')
    getByText('healthy')
    getByText(`${statusCheck.time.toLocaleString()}`)
    getByText(`${statusCheck.startupTime.toLocaleString()}`)
    getByText(`${statusCheck.nuxtAppVersion}`)
  })
})
