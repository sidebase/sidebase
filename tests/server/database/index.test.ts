import { afterEach, describe, expect, it, vi } from 'vitest'
import { AppDataSource, initialize } from '~/server/database'

afterEach(() => {
  vi.restoreAllMocks()

  // @ts-expect-error This is a read only property
  AppDataSource.isInitialized = false
})

describe('DB initialization', () => {
  it('attempts to initialize the database', async () => {
    const spy = vi.spyOn(AppDataSource, 'initialize')
    spy.mockImplementationOnce(async () => {
      // @ts-expect-error This is a read only property
      AppDataSource.isInitialized = true
      return AppDataSource
    })

    await initialize()
    expect(spy).toHaveBeenCalledOnce()

    // We still only expect the spy to have been called once
    // even if we try a second initalization, as the implementation
    // logic should avoid an unnecessary re-init as long as
    // `isInitialized = true`, which happens in above mock.
    await initialize()
    expect(spy).toHaveBeenCalledOnce()
  })
})
