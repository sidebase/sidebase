import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { SuperTest, Test } from 'supertest'
import dayjs from 'dayjs'
import type { PathMethodHandler } from '../../utils'
import { setupApiAndDatabase } from '../../utils'
import handlerHealthzGet from '~/server/api/healthz.get'
import { AppDataSource } from '~/server/database'
import { consoleSpyError } from '~/tests/setupTestUtils'

const endpointBasePath = '/healthz'
const endpoints: PathMethodHandler[] = [{
  path: endpointBasePath,
  method: 'get',
  handler: handlerHealthzGet,
}]

let request: SuperTest<Test>
beforeEach(async () => {
  const testingUtils = await setupApiAndDatabase(endpoints)

  request = testingUtils.request
})

describe(`GET ${endpointBasePath}`, () => {
  it('should return healthy', async () => {
    const response = await request.get(endpointBasePath)

    expect(response.statusCode).toBe(200)
    expect(response.body.status).toEqual('healthy')
    expect(dayjs(response.body.time).isValid()).toBe(true)
    expect(dayjs(response.body.startupTime).isValid()).toBe(true)
    expect(response.body.nuxtAppVersion).toBe(process.env.NUXT_APP_VERSION || process.env.npm_package_version || 'unknown')
  })

  it('should return 500 if database connection fails', async () => {
    await AppDataSource.destroy()
    const response = await request.get(endpointBasePath)

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({
      statusCode: 500,
      stack: [],
    })

    // Assert that server logged error, then reset spy so that global no-console-error assert does not fail
    expect(consoleSpyError).toHaveBeenCalledOnce()
    expect(consoleSpyError).toHaveBeenCalledWith('Healthcheck failed: DB connection not initialized')
    consoleSpyError.mockClear()

    vi.restoreAllMocks()
  })
})
