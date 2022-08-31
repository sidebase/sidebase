import { afterAll, afterEach, expect, vi } from 'vitest'
import { cleanup } from '@testing-library/vue'
import type {
  TestingLibraryMatchers,
} from '@testing-library/jest-dom/matchers'
import matchers from '@testing-library/jest-dom/matchers'

// Add `jest-dom` style matchers for testing and fix their typing
declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
  }
}
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

// Mock `matchMedia` to be defined in fake js-dom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
