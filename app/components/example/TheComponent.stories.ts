import type { Story } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import TheComponent from './TheComponent.vue'

export default {
  title: 'Example/TheComponent',
  component: TheComponent,
}

const Template: Story = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TheComponent },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args }
  },

  // Define any actions you want to log (like emitted events)
  methods: { submit: action('submitted') },

  // Then, the spread values can be accessed directly in the template
  template: '<the-component :placeholder="placeholder" :model-value="modelValue" @submit="submit" />',
})

export const NoPlaceholder = Template.bind({})
NoPlaceholder.args = {
  placeholder: undefined,
  modelValue: '',
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  placeholder: 'Enter your name...',
  modelValue: '',
}

export const Prefilled = Template.bind({})
Prefilled.args = {
  placeholder: 'Enter your name...',
  modelValue: 'SIDESTREAM',
}
