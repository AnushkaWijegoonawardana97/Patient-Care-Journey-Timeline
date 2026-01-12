import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgress } from './CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  title: 'Atoms/CircularProgress',
  component: CircularProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    percentage: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    size: {
      control: { type: 'range', min: 32, max: 200, step: 8 },
    },
    strokeWidth: {
      control: { type: 'range', min: 2, max: 20, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const ZeroPercent: Story = {
  args: {
    percentage: 0,
  },
};

export const TwentyFivePercent: Story = {
  args: {
    percentage: 25,
  },
};

export const FiftyPercent: Story = {
  args: {
    percentage: 50,
  },
};

export const SeventyFivePercent: Story = {
  args: {
    percentage: 75,
  },
};

export const OneHundredPercent: Story = {
  args: {
    percentage: 100,
  },
};

export const CustomSize: Story = {
  args: {
    percentage: 65,
    size: 100,
  },
};

export const CustomStroke: Story = {
  args: {
    percentage: 45,
    strokeWidth: 10,
  },
};

export const Small: Story = {
  args: {
    percentage: 80,
    size: 48,
    strokeWidth: 4,
  },
};

export const Large: Story = {
  args: {
    percentage: 60,
    size: 120,
    strokeWidth: 12,
  },
};
