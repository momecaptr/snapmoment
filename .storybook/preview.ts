import type { Preview } from '@storybook/react';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '@/myApp/styles/index.scss';
import { themes } from '@storybook/theming';
const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000'
        },
        {
          name: 'white',
          value: '#ffffff'
        }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
