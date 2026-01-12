import type { Meta, StoryObj } from '@storybook/react';
import { LanguageToggle } from './LanguageToggle';

const meta: Meta<typeof LanguageToggle> = {
  title: 'Molecules/LanguageToggle',
  component: LanguageToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = {
  args: {},
};

export const English: Story = {
  args: {},
};

export const Spanish: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Language toggle is currently disabled (display only)',
      },
    },
  },
};
