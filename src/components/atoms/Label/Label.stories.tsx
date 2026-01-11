import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const WithHtmlFor: Story = {
  args: {
    htmlFor: 'input-id',
    children: 'Label for Input',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <input id="input-id" placeholder="Associated input" />
    </div>
  ),
};
