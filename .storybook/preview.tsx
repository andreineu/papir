import { withThemeByClassName } from '@storybook/addon-styling';
import type { Preview } from '@storybook/react';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
    (Story) => (
      <div className="min-h-screen p-4 dark:bg-neutral-900 dark:text-white">
        <Story />
      </div>
    ),
  ],
};

export default preview;
