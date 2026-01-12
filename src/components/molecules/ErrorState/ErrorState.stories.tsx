import type { Meta, StoryObj } from '@storybook/react';
import { ErrorState } from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Molecules/ErrorState',
  component: ErrorState,
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
    retryLabel: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
  args: {
    title: 'Something went wrong',
    message: "We couldn't load the data. Please check your connection and try again.",
  },
};

export const WithRetry: Story = {
  args: {
    title: 'Unable to load data',
    message: "We couldn't load your data. Please check your connection and try again.",
    onRetry: () => {
      console.log('Retry clicked');
    },
    retryLabel: 'Try Again',
  },
};

export const CustomMessage: Story = {
  args: {
    title: 'Connection Error',
    message: 'Unable to connect to the server. Please check your internet connection.',
    onRetry: () => {
      console.log('Retry clicked');
    },
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Oops! Something went wrong',
    message: 'An unexpected error occurred. Our team has been notified.',
    onRetry: () => {
      console.log('Retry clicked');
    },
    retryLabel: 'Reload Page',
  },
};

export const NoRetry: Story = {
  args: {
    title: 'Service Unavailable',
    message: 'This service is currently unavailable. Please try again later.',
  },
};
