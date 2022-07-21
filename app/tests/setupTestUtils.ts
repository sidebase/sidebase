import matchers from '@testing-library/jest-dom/matchers'
import { afterAll, afterEach, expect, vi } from 'vitest'
import { cleanup } from '@testing-library/vue'

// Followed https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/ to setup https://github.com/testing-library/jest-dom to
// have things like `toHaveValue`
expect.extend(matchers)

// Ensure that console.warn and console.error have not been called
export const consoleSpyWarn = vi.spyOn(console, 'warn')
export const consoleSpyError = vi.spyOn(console, 'error')

afterAll(() => {
  // There must be no `console.warn`s
  expect(consoleSpyWarn).not.toHaveBeenCalled()

  // There must be no `console.error`s
  expect(consoleSpyError).not.toHaveBeenCalled()

  vi.restoreAllMocks()
})

// Clear all testing library `render`s after each test
// this is supposed to work automatically (see https://testing-library.com/docs/vue-testing-library/api/#cleanup),
// but does not seem to work with vitest
afterEach(() => {
  cleanup()
})
