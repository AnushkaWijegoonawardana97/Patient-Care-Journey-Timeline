import type { Meta, StoryObj } from '@storybook/react';
import { VisitInfoItem } from './VisitInfoItem';
import { Calendar, Clock, User, CheckCircle2 } from 'lucide-react';

const meta: Meta<typeof VisitInfoItem> = {
  title: 'Molecules/VisitInfoItem',
  component: VisitInfoItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    iconBg: {
      control: 'text',
    },
    iconColor: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VisitInfoItem>;

export const Default: Story = {
  args: {
    icon: Calendar,
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    iconColor: 'text-white',
    label: 'Scheduled Date',
    value: 'Monday, January 10, 2025',
  },
};

export const WithSecondaryValue: Story = {
  args: {
    icon: Calendar,
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    iconColor: 'text-white',
    label: 'Scheduled Date',
    value: 'Monday, January 10, 2025',
    secondaryValue: '3:30 PM',
  },
};

export const ClockIcon: Story = {
  args: {
    icon: Clock,
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    iconColor: 'text-white',
    label: 'Duration',
    value: '45 minutes',
  },
};

export const UserIcon: Story = {
  args: {
    icon: User,
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    iconColor: 'text-white',
    label: 'Care Provider',
    value: 'Angela Rivera',
  },
};

export const CheckCircleIcon: Story = {
  args: {
    icon: CheckCircle2,
    iconBg: 'bg-gradient-to-br from-emerald-500 to-green-600',
    iconColor: 'text-white',
    label: 'Completed Date',
    value: 'Friday, October 15, 2024',
    secondaryValue: '2:00 PM',
  },
};

export const DifferentColors: Story = {
  args: {
    icon: Calendar,
    iconBg: 'bg-gradient-to-br from-pink-500 to-rose-600',
    iconColor: 'text-white',
    label: 'Appointment',
    value: 'January 10, 2025',
    secondaryValue: '10:00 AM',
  },
};
