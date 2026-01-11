import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Email',
    id: 'email',
    placeholder: 'Enter your email',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    id: 'email',
    placeholder: 'Enter your email',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    id: 'email',
    placeholder: 'Enter your email',
    error: 'Email is required',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
};
