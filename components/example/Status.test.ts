import { describe, expect, test } from 'vitest'
import Status from './Status.vue'
import { render } from '~/tests/testingLibraryVue'
import type { ResponseHealthcheck } from '~/server/schemas/healthz'

const fakeStatusCheckSuccess: ResponseHealthcheck = {
  status: 'healthy',
  startupTime: new Date(2000, 1, 1, 13),
  time: new Date(2000, 1, 1, 14),
  nuxtAppVersion: 'v0.0.1',
}

describe('Status', () => {
  test('mounts and is still the same for fail variant', () => {
    const { html } = render(Status, { props: { statusCheck: null } })
    expect(html()).toMatchSnapshot()
  })

  test('mounts and is still the same for success variant', () => {
    const { html } = render(Status, { props: { statusCheck: fakeStatusCheckSuccess } })
    expect(html()).toMatchSnapshot()
  })

  test('displays all status values', async () => {
    const { getByText } = render(Status, { props: { statusCheck: fakeStatusCheckSuccess } })

    // Ensure all expected text is there:
    getByText('Live backend service status is:')
    getByText('Status')
    getByText('healthy')
    getByText(`${fakeStatusCheckSuccess.time.toLocaleString()}`)
    getByText(`${fakeStatusCheckSuccess.startupTime.toLocaleString()}`)
    getByText(`${fakeStatusCheckSuccess.nuxtAppVersion}`)
  })
})
