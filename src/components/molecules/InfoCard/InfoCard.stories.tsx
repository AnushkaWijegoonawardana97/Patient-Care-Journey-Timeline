import type { Meta, StoryObj } from '@storybook/react';
import { InfoCard } from './InfoCard';
import { User, Calendar, Ruler, Droplet, Heart } from 'lucide-react';

const meta: Meta<typeof InfoCard> = {
  title: 'Molecules/InfoCard',
  component: InfoCard,
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
    iconBgColor: {
      control: 'text',
    },
    iconColor: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfoCard>;

export const Default: Story = {
  args: {
    icon: User,
    label: 'Gender',
    value: 'Female',
  },
};

export const WithCustomIcon: Story = {
  args: {
    icon: Calendar,
    label: 'Age',
    value: '28 y.o.',
    iconBgColor: 'bg-gradient-to-br from-pink-100 to-pink-200/50',
    iconColor: 'text-pink-600',
  },
};

export const DifferentColors: Story = {
  args: {
    icon: Ruler,
    label: 'Height',
    value: '165cm',
    iconBgColor: 'bg-gradient-to-br from-secondary-light to-secondary-success/20',
    iconColor: 'text-secondary-success',
  },
};

export const BloodType: Story = {
  args: {
    icon: Droplet,
    label: 'Blood Type',
    value: 'O+',
    iconBgColor: 'bg-gradient-to-br from-red-100 to-red-200/50',
    iconColor: 'text-red-600',
  },
};

export const HeartIcon: Story = {
  args: {
    icon: Heart,
    label: 'Status',
    value: 'Active',
    iconBgColor: 'bg-gradient-to-br from-primary-light to-primary/20',
    iconColor: 'text-primary',
  },
};
