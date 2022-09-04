import { describe, expect, test } from 'vitest'
import Status from './Status.vue'
import { render } from '~/tests/testingLibraryVue'
import type { StatusCheckFail, StatusCheckSuccess } from '~/types'

const fakeStatusCheckSuccess: StatusCheckSuccess = {
  error: null,
  result: {
    status: 'healthy',
    startupTime: new Date(2000, 1, 1, 13),
    time: new Date(2000, 1, 1, 14),
    nuxtAppVersion: 'v0.0.1',
  },
}

describe('Status', () => {
  test('mounts and is still the same for fail variant', () => {
    const statusCheck: StatusCheckFail = {
      error: true,
      result: null,
    }
    const { html } = render(Status, { props: { statusCheck } })
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
    getByText(`${fakeStatusCheckSuccess.result.time}`)
    getByText(`${fakeStatusCheckSuccess.result.startupTime}`)
    getByText(`${fakeStatusCheckSuccess.result.nuxtAppVersion}`)
  })
})
