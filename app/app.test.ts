import { describe, expect, test } from 'vitest'
import { fireEvent, render } from './tests/testingLibraryVue'
import app from './app.vue'

type Stars = 0 | 1 | 2 | 3 | 4

const checkStarsOutOfFive = (expectedFilledStars: Stars, starsInIncreasingOrder: HTMLElement[]) => {
  starsInIncreasingOrder.forEach((star, index) => {
    if (index <= expectedFilledStars) {
      expect(star.parentElement).toHaveClass('ant-rate-star-full')
    } else {
      expect(star.parentElement).toHaveClass('ant-rate-star-zero')
    }
  })
}

describe('app', () => {
  test('mounts and is still the same', () => {
    const { html } = render(app)
    expect(html()).toMatchSnapshot()
  })

  test('stars are selecatble', async () => {
    const { getAllByRole } = render(app)

    const stars = getAllByRole('radio')

    // Initial state should be 5 stars
    expect(stars).toHaveLength(5)
    checkStarsOutOfFive(4, stars)

    // Switch to 3 stars
    await fireEvent.click(stars[2])
    checkStarsOutOfFive(2, stars)
  })
})
