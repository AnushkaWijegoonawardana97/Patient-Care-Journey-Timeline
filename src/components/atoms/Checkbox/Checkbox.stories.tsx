import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { Label } from '../Label/Label';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    'aria-label': 'Checkbox',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    'aria-label': 'Checked checkbox',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled checkbox',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};
