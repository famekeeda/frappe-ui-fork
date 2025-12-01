import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#FFFFFF',
        },
        {
          name: 'gray',
          value: '#F5F5F5',
        },
        {
          name: 'dots',
          value: '#FFFFFF',
        },
      ],
    },
  },
}

export default preview
