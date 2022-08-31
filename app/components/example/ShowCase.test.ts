import { describe, expect, test } from 'vitest'
import ShowCase from './ShowCase.vue'
import { fireEvent, render } from '~/tests/testingLibraryVue'

describe('ShowCase', () => {
  test('mounts and is still the same', () => {
    const { html } = render(ShowCase, { props: { nameInitialValue: 'Udo' } })
    expect(html()).toMatchSnapshot()
  })

  test('gets its starting input value from a prop', async () => {
    const nameInitialValue = 'SIDESTREAM'
    const { getByPlaceholderText } = render(ShowCase, { props: { nameInitialValue } })

    const nameInput = getByPlaceholderText('Your name...')
    expect(nameInput).toHaveValue(nameInitialValue)
  })

  test('emits changed values on button click', async () => {
    const { emitted, getByPlaceholderText, getByText } = render(ShowCase, { props: { nameInitialValue: '' } })

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
