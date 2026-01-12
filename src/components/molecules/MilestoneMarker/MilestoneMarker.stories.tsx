import type { Meta, StoryObj } from '@storybook/react';
import { MilestoneMarker } from './MilestoneMarker';
import type { Milestone } from '@/types/journey';

const meta: Meta<typeof MilestoneMarker> = {
  title: 'Molecules/MilestoneMarker',
  component: MilestoneMarker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isLast: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MilestoneMarker>;

const mockTrimesterMilestone: Milestone = {
  id: 'm_001',
  type: 'trimester',
  title: 'Second Trimester',
  date: '2024-09-15',
  description: 'Weeks 14-27',
};

const mockDueDateMilestone: Milestone = {
  id: 'm_002',
  type: 'due_date',
  title: 'Due Date',
  date: '2025-03-15',
};

const mockPostpartumMilestone: Milestone = {
  id: 'm_003',
  type: 'postpartum_week',
  title: '6 Weeks Postpartum',
  date: '2025-04-26',
  description: 'Important postpartum milestone',
};

const mockCustomMilestone: Milestone = {
  id: 'm_004',
  type: 'custom',
  title: 'Special Celebration',
  date: '2025-05-01',
  description: 'A special moment in your journey',
};

const mockMilestoneWithDescription: Milestone = {
  id: 'm_005',
  type: 'trimester',
  title: 'Third Trimester',
  date: '2024-12-15',
  description: 'Weeks 28-40',
};

export const Trimester: Story = {
  args: {
    milestone: mockTrimesterMilestone,
    isLast: false,
  },
};

export const DueDate: Story = {
  args: {
    milestone: mockDueDateMilestone,
    isLast: false,
  },
};

export const PostpartumWeek: Story = {
  args: {
    milestone: mockPostpartumMilestone,
    isLast: false,
  },
};

export const Custom: Story = {
  args: {
    milestone: mockCustomMilestone,
    isLast: false,
  },
};

export const WithDescription: Story = {
  args: {
    milestone: mockMilestoneWithDescription,
    isLast: false,
  },
};

export const LastItem: Story = {
  args: {
    milestone: mockTrimesterMilestone,
    isLast: true,
  },
};
