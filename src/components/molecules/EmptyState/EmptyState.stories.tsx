import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Activity, Inbox, Search } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No items found',
    message: 'There are no items to display at this time.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No journey data',
    message: "Your care journey hasn't been set up yet. Please contact your care team for assistance.",
    action: (
      <Button onClick={() => {}}>
        Contact Support
      </Button>
    ),
  },
};

export const CustomIcon: Story = {
  args: {
    icon: Activity,
    title: 'No activity',
    message: 'There is no activity to show.',
  },
};

export const CustomMessage: Story = {
  args: {
    icon: Inbox,
    title: 'Empty inbox',
    message: 'You have no messages. When you receive messages, they will appear here.',
  },
};

export const NoMessage: Story = {
  args: {
    icon: Search,
    title: 'No results found',
  },
};
