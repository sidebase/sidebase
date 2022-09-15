import type { RenderOptions, RenderResult } from '@testing-library/vue'
import { cleanup, fireEvent, render } from '@testing-library/vue'

const NuxtStubs = {
  NuxtLink: true,
  Head: true,
  Title: true,
}

const renderNuxtStubbed = (TestComponent: any, options?: RenderOptions): RenderResult => {
  let stubs = options?.global?.stubs || {}
  if (Array.isArray(stubs)) {
    stubs = [...stubs, ...Object.keys(NuxtStubs)]
  } else {
    stubs = {
      ...stubs,
      ...NuxtStubs,
    }
  }

  const optionsWithNuxtStubs = {
    ...(options || {}),
    global: {
      ...(options?.global || {}),
      stubs,
    },
  }
  return render(TestComponent, optionsWithNuxtStubs)
}

export { renderNuxtStubbed as render, fireEvent, cleanup }
