import { beforeEach, describe, expect, it } from 'vitest'
import type { SuperTest, Test } from 'supertest'
import { faker } from '@faker-js/faker'
import type { PathMethodHandler } from '../../utils'
import { setupApiAndDatabase } from '../../utils'
import handlerExampleGet from '~/server/api/example/[id].get'
import handlerExampleGetAll from '~/server/api/example/index'
import { consoleSpyError } from '~/tests/setupTestUtils'

const endpointBasePath = '/example'
const endpoints: PathMethodHandler[] = [{
  path: endpointBasePath,
  method: 'get',
  handler: handlerExampleGetAll,
}, {
  path: `${endpointBasePath}/:id`,
  method: 'get',
  handler: handlerExampleGet,
}]

let request: SuperTest<Test>
beforeEach(async () => {
  const testingUtils = await setupApiAndDatabase(endpoints)

  request = testingUtils.request
})

describe(`GET ${endpointBasePath}`, () => {
  it('should return an empty list for list endpoint', async () => {
    const response = await request.get(endpointBasePath)

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual([])
  })
})

describe(`GET ${endpointBasePath}/:id`, () => {
  it('should throw a 404 error for an unknown id', async () => {
    const response = await request.get(`${endpointBasePath}/${faker.datatype.uuid()}`)

    expect(response.statusCode).toBe(404)
    expect(response.body).toStrictEqual({
      stack: [],
      statusCode: 404,
      statusMessage: 'Failed to find desired record',
    })

    // Assert that server logged error, then reset spy so that global no-console-error assert does not fail
    expect(consoleSpyError).toHaveBeenCalledOnce()
    consoleSpyError.mockClear()
  })

  it('should throw a 422 error for a invalid id', async () => {
    const response = await request.get(`${endpointBasePath}/bad-uuid`)

    expect(response.statusCode).toBe(422)
    expect(response.body).toStrictEqual({
      statusCode: 422,
      statusMessage: 'Data validation failed',
      stack: [],
      data: {
        value: { id: 'bad-uuid' },
        path: 'id',
        type: 'uuid',
        errors: ['id must be a valid UUID'],
        params: {
          value: 'bad-uuid',
          originalValue: 'bad-uuid',
          path: 'id',
          regex: {},
        },
        inner: [],
        name: 'ValidationError',
        message: 'id must be a valid UUID',
      },
    })
  })
})
