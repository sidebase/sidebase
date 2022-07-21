import { afterEach, describe, expect, it, vi } from 'vitest'
import plugin from '~/server/database/nitroPluginInitTypeOrmOnStartup'
import { AppDataSource } from '~/server/database'

afterEach(() => {
  vi.restoreAllMocks()

  // @ts-expect-error This is a read only property
  AppDataSource.isInitialized = false
})

describe('Nitro plugin initialization', () => {
  it('attempts to initialize the database', async () => {
    const spy = vi.spyOn(AppDataSource, 'initialize')
    spy.mockImplementationOnce(async () => {
      // @ts-expect-error This is a read only property
      AppDataSource.isInitialized = true
      return AppDataSource
    })

    // @ts-expect-error `{}` is not a valid `NitroApp` (what the plugin signature expects), but it doesn't matter as we dont make use of the nitro app
    await plugin({})
    expect(spy).toHaveBeenCalledOnce()

    // We still only expect the spy to have been called once
    // even if we try a second initalization, as the implementation
    // logic should avoid an unnecessary re-init as long as
    // `isInitialized = true`, which happens in above mock.
    // @ts-expect-error `{}` is not a valid `NitroApp` (what the plugin signature expects), but it doesn't matter as we dont make use of the nitro app
    await plugin({})
    expect(spy).toHaveBeenCalledOnce()
  })

  it('exits the process on bad initialization', async () => {
    const spyProcess = vi.spyOn(process, 'exit')

    // @ts-expect-error process exit should usually return `never` (i.e.: never return, as it exits the process!)
    spyProcess.mockImplementationOnce(() => { })

    const spyAppDataSource = vi.spyOn(AppDataSource, 'initialize')
    spyAppDataSource.mockImplementationOnce(async () => {
      throw new Error('Bad DB init')
    })

    // @ts-expect-error `{}` is not a valid `NitroApp` (what the plugin signature expects), but it doesn't matter as we dont make use of the nitro app
    await plugin({})

    expect(spyProcess).toHaveBeenCalledOnce()
    expect(spyProcess).toHaveBeenCalledWith(-1)
  })
})
