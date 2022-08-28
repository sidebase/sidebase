import { describe, expect, test } from 'vitest'
import TheComponent from './TheComponent.vue'
import { fireEvent, render } from '~/tests/testingLibraryVue'

describe('TheComponent', () => {
  test('mounts and is still the same', () => {
    const { html } = render(TheComponent, { props: { modelValue: '' } })
    expect(html()).toMatchSnapshot()
  })

  test('gets its starting input value from a prop', async () => {
    const modelValue = 'SIDESTREAM'
    const { getByPlaceholderText } = render(TheComponent, { props: { modelValue } })

    const nameInput = getByPlaceholderText('Your name...')
    expect(nameInput).toHaveValue(modelValue)
  })

  test('emits changed values on button click', async () => {
    const { emitted, getByPlaceholderText, getByText } = render(TheComponent, { props: { modelValue: '' } })

    // Enter text
    const name = 'Peter'
    const nameInput = getByPlaceholderText('Your name...')
    await fireEvent.update(nameInput, name)

    // Submit form
    const submitButton = getByText('Submit')
    await fireEvent.click(submitButton)

    // Check outcome
    const emits = emitted()
    expect(emits).toHaveProperty('submit')
    expect(emits.submit).toMatchObject([[{ name }]])
  })
})
