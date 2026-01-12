import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSkeleton } from './LoadingSkeleton';

const meta: Meta<typeof LoadingSkeleton> = {
  title: 'Molecules/LoadingSkeleton',
  component: LoadingSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['dashboard', 'journey', 'services', 'cards', 'list'],
    },
    count: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSkeleton>;

export const Dashboard: Story = {
  args: {
    variant: 'dashboard',
  },
};

export const Journey: Story = {
  args: {
    variant: 'journey',
  },
};

export const Services: Story = {
  args: {
    variant: 'services',
    count: 6,
  },
};

export const Cards: Story = {
  args: {
    variant: 'cards',
    count: 3,
  },
};

export const List: Story = {
  args: {
    variant: 'list',
    count: 5,
  },
};

export const MultipleCards: Story = {
  args: {
    variant: 'cards',
    count: 6,
  },
};

export const MultipleServices: Story = {
  args: {
    variant: 'services',
    count: 8,
  },
};
