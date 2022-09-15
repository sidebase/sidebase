import { describe, expect, it } from 'vitest'
import plugin from '~/server/plugins/initTypeOrmOnServerStartup'
import { AppDataSource } from '~/server/database'

describe('Nitro plugin initialization', () => {
  it('attempts to initialize the database', async () => {
    // @ts-expect-error `{}` is not a valid `NitroApp` (what the plugin signature expects), but it doesn't matter as we dont make use of the nitro app
    await plugin({})
    expect(AppDataSource.isInitialized).toBe(true)

    // Call it a second time, to ensure the call to be somewhat idempotent: Doesn't fail when called mutltiple times
    // @ts-expect-error `{}` is not a valid `NitroApp` (what the plugin signature expects), but it doesn't matter as we dont make use of the nitro app
    await plugin({})
    expect(AppDataSource.isInitialized).toBe(true)
  })
})
