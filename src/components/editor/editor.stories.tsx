import type { Meta, StoryObj } from '@storybook/react';

import { Editor } from './editor';

const meta: Meta<typeof Editor> = {
  component: Editor,
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const Example: Story = {
  render: () => (
    <div className="p-4 dark:bg-neutral-900">
      <Editor content="" />
    </div>
  ),
};
