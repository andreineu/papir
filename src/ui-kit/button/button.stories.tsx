import type { Meta, StoryObj } from '@storybook/react';

import type { ButtonProps } from './button';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

const variants: ButtonProps['variant'][] = [
  'default',
  'destructive',
  'ghost',
  'link',
  'outline',
  'secondary',
];

const sizes: ButtonProps['size'][] = ['sm', 'default', 'lg'];

export const AllVariants: Story = {
  render: () => (
    <>
      <div className="flex gap-2">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {variant}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </>
  ),
};
