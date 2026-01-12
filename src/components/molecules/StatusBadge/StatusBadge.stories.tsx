import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';
import type { VisitStatus } from '@/types/journey';

const meta: Meta<typeof StatusBadge> = {
  title: 'Molecules/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['completed', 'scheduled', 'available', 'missed', 'cancelled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Completed: Story = {
  args: {
    status: 'completed' as VisitStatus,
  },
};

export const Scheduled: Story = {
  args: {
    status: 'scheduled' as VisitStatus,
  },
};

export const Available: Story = {
  args: {
    status: 'available' as VisitStatus,
  },
};

export const Missed: Story = {
  args: {
    status: 'missed' as VisitStatus,
  },
};

export const Cancelled: Story = {
  args: {
    status: 'cancelled' as VisitStatus,
  },
};

export const Small: Story = {
  args: {
    status: 'completed' as VisitStatus,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    status: 'scheduled' as VisitStatus,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    status: 'completed' as VisitStatus,
    size: 'lg',
  },
};
