import type { Meta, StoryObj } from '@storybook/react';
import { SummaryCard } from './SummaryCard';
import { CheckCircle2, Calendar, Heart } from 'lucide-react';

const meta: Meta<typeof SummaryCard> = {
  title: 'Molecules/SummaryCard',
  component: SummaryCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    iconColor: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SummaryCard>;

export const Default: Story = {
  args: {
    title: 'Visit Progress',
    value: '5 of 8',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Next Visit',
    value: 'January 10, 2025',
    description: 'Upcoming appointment',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Visit Progress',
    value: '3 of 6',
    icon: CheckCircle2,
    iconColor: 'text-secondary-success',
  },
};

export const StringValue: Story = {
  args: {
    title: 'Journey Status',
    value: 'On Track',
    icon: Heart,
    iconColor: 'text-secondary-success',
  },
};

export const ReactNodeValue: Story = {
  args: {
    title: 'Visit Progress',
    value: (
      <div>
        <p className="text-2xl font-bold text-text-primary">3 of 6</p>
        <div className="mt-3 w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-secondary-success to-secondary-emphasis rounded-full"
            style={{ width: '50%' }}
          />
        </div>
        <p className="text-xs font-semibold text-text-secondary mt-2">50% completed</p>
      </div>
    ),
    icon: CheckCircle2,
    iconColor: 'text-secondary-success',
  },
};

export const CalendarIcon: Story = {
  args: {
    title: 'Next Visit',
    value: 'January 10, 2025',
    description: 'Upcoming appointment',
    icon: Calendar,
    iconColor: 'text-primary',
  },
};
