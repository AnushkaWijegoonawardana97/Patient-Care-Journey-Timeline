import type { Meta, StoryObj } from '@storybook/react';
import { NavigationItem } from './NavigationItem';
import { BrowserRouter } from 'react-router-dom';
import { LayoutDashboard, Calendar, Settings } from 'lucide-react';

const meta: Meta<typeof NavigationItem> = {
  title: 'Molecules/NavigationItem',
  component: NavigationItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    active: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationItem>;

export const Active: Story = {
  args: {
    icon: LayoutDashboard,
    label: 'Dashboard',
    to: '/dashboard',
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    icon: Calendar,
    label: 'Care Journey',
    to: '/care-journey',
    active: false,
  },
};

export const WithIcon: Story = {
  args: {
    icon: Settings,
    label: 'Settings',
    to: '/settings',
    active: false,
  },
};

export const DifferentIcons: Story = {
  args: {
    icon: Calendar,
    label: 'Calendar',
    to: '/calendar',
    active: true,
  },
};
