import { beforeEach, describe, expect, it } from 'vitest'
import type { SuperTest, Test } from 'supertest'
import { faker } from '@faker-js/faker'
import type { PathMethodHandler } from '../../utils'
import { setupApiAndDatabase } from '../../utils'
import handlerExampleGet from '~/server/api/example/[id].get'
import handlerExamplePatch from '~/server/api/example/[id].patch'
import handlerExampleGetAll from '~/server/api/example/index'
import { consoleSpyError } from '~/tests/setupTestUtils'
import { Example } from '~/server/database/entities/Example'

const endpointBasePath = '/example'
const endpoints: PathMethodHandler[] = [{
  path: endpointBasePath,
  method: 'get',
  handler: handlerExampleGetAll,
}, {
  path: `${endpointBasePath}/:id`,
  method: 'get',
  handler: handlerExampleGet,
}, {
  path: `${endpointBasePath}/:id`,
  method: 'patch',
  handler: handlerExamplePatch,
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

// Generate test cases that check if `id` parameter is correctly validated for `id` based endpoints
const idBasedEndpoints = endpoints.filter(endpoint => endpoint.path.endsWith('/:id'))
describe.each(idBasedEndpoints)(`$method ${endpointBasePath}/:id check 404 and 422 for parameter`, ({ method }) => {
  it('should throw a 404 error for an unknown id', async () => {
    const response = await request[method](`${endpointBasePath}/${faker.datatype.uuid()}`)

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
    const response = await request[method](`${endpointBasePath}/bad-uuid`)

    expect(response.statusCode).toBe(422)
    expect(response.body).toStrictEqual({
      data: {
        issues: [
          {
            code: 'invalid_string',
            message: 'Invalid uuid',
            path: [
              'id',
            ],
            validation: 'uuid',
          },
        ],
        name: 'ZodError',
      },
      stack: [],
      statusCode: 422,
      statusMessage: 'Parameter parsing failed',
    })
  })
})

describe(`PATCH ${endpointBasePath}/:id`, () => {
  it('should update an entity', async () => {
    const exampleToCreate = { description: faker.lorem.word(), details: faker.lorem.paragraphs() }
    const example = await Example.save<Example>(exampleToCreate)
    expect(example.description).toBe(exampleToCreate.description)
    expect(example.details).toBe(exampleToCreate.details)

    const exampleUpdate = { description: faker.lorem.word(), details: faker.lorem.paragraphs() }
    const response = await request.patch(`${endpointBasePath}/${example.id}`).send(exampleUpdate)

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      id: example.id,
      ...exampleUpdate,
    })
  })
})
