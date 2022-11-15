import type { EventHandler, RouterMethod } from 'h3'
import { createApp, createRouter, toNodeListener } from 'h3'
import type { SuperTest, Test } from 'supertest'
import supertest from 'supertest'
import { AppDataSource } from '~/server/database'

declare interface AppTestingUtils {
  request: SuperTest<Test>
}

/**
 * A triple of a path that a HTTP request is addressed to with method `method` which will be handled by a handler.
 *
 * NOTE: `path` can also contain patterns, like `/tasks/:id`, where `:id` will be matched to any characters following the last `/` dynamically. So `/tasks/1` in that case would make `id = 1`.
 */
export declare interface PathMethodHandler {
  path: string
  method: RouterMethod
  handler: EventHandler
}

/**
 * Setup a `h3` (the nuxt3 server) app and the database, returns a helper to make requests to server.
 * @param  {PathMethodHandler[]} routesToSetup Array of routes to setup on server.
 * @return {Promise<AppTestingUtils>} Helper to perform server requests.
 *
 * Examples:
 * ```ts
 * // Perform a get request
 * await request.get('/tasks')
 *
 * // Perform a post request and send some data
 * const response = await request.post('/tasks').send({ some: 'data' })
 *
 * // Get the response status
 * console.log(response.status)  // -> output Number, e.g.: 200
 * ```
 *
 */
export const setupApiAndDatabase = async (routesToSetup: PathMethodHandler[]): Promise<AppTestingUtils> => {
  // Setup routes
  const router = createRouter()
  for (const { path, method, handler } of routesToSetup) {
    router.add(path, handler, method)
  }

  // Setup app
  const app = createApp()
  app.use(router)

  // Reset database
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
  await AppDataSource.synchronize(true)

  // Return `request`, use like `await request.get('/some/path')`
  return { request: supertest(toNodeListener(app)) }
}
