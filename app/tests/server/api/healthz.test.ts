import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { SuperTest, Test } from 'supertest'
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
    expect(response.text).toEqual('healthy')
  })

  it('should return 500 if database connection fails', async () => {
    await AppDataSource.destroy()
    const response = await request.get(endpointBasePath)

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      stack: [],
    })

    // Assert that server logged error, then reset spy so that global no-console-error assert does not fail
    expect(consoleSpyError).toHaveBeenCalledOnce()
    expect(consoleSpyError).toHaveBeenCalledWith('Healthcheck failed: DB connection not initialized')
    consoleSpyError.mockClear()

    vi.restoreAllMocks()
  })
})
