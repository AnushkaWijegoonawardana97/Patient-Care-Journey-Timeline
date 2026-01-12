import type { Meta, StoryObj } from '@storybook/react';
import { VisitCard } from './VisitCard';
import type { Visit } from '@/types/journey';

const meta: Meta<typeof VisitCard> = {
  title: 'Molecules/VisitCard',
  component: VisitCard,
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
type Story = StoryObj<typeof VisitCard>;

const mockCompletedVisit: Visit = {
  id: 'v_001',
  type: 'prenatal_postpartum',
  visitNumber: 1,
  totalOfType: 8,
  status: 'completed',
  completedDate: '2024-10-15T14:00:00Z',
  scheduledDate: '2024-10-15T14:00:00Z',
  doula: {
    id: 'd_001',
    name: 'Angela Rivera',
    photo: '/doula-avatar.JPG',
    languages: ['English', 'Spanish'],
  },
  notes: 'Reviewed nutrition and exercise. Patient feeling well.',
  durationMinutes: 45,
};

const mockScheduledVisit: Visit = {
  id: 'v_002',
  type: 'prenatal_postpartum',
  visitNumber: 3,
  totalOfType: 8,
  status: 'scheduled',
  scheduledDate: '2025-01-10T10:00:00Z',
  doula: {
    id: 'd_001',
    name: 'Angela Rivera',
    photo: '/doula-avatar.JPG',
    languages: ['English', 'Spanish'],
  },
};

const mockAvailableVisit: Visit = {
  id: 'v_003',
  type: 'prenatal_postpartum',
  visitNumber: 4,
  totalOfType: 8,
  status: 'available',
};

const mockMissedVisit: Visit = {
  id: 'v_004',
  type: 'prenatal_postpartum',
  visitNumber: 2,
  totalOfType: 8,
  status: 'missed',
  scheduledDate: '2024-11-15T10:00:00Z',
};

const mockCancelledVisit: Visit = {
  id: 'v_005',
  type: 'prenatal_postpartum',
  visitNumber: 5,
  totalOfType: 8,
  status: 'cancelled',
  scheduledDate: '2025-02-01T10:00:00Z',
};

const mockInitialVisit: Visit = {
  id: 'v_initial',
  type: 'initial',
  visitNumber: 1,
  totalOfType: 1,
  status: 'completed',
  completedDate: '2024-10-01T10:00:00Z',
  doula: {
    id: 'd_001',
    name: 'Angela Rivera',
    photo: '/doula-avatar.JPG',
    languages: ['English', 'Spanish'],
  },
  notes: 'Initial consultation completed.',
  durationMinutes: 60,
};

export const Completed: Story = {
  args: {
    visit: mockCompletedVisit,
    isLast: false,
    onClick: () => {
      console.log('Visit clicked');
    },
  },
};

export const Scheduled: Story = {
  args: {
    visit: mockScheduledVisit,
    isLast: false,
    onClick: () => {
      console.log('Visit clicked');
    },
  },
};

export const Available: Story = {
  args: {
    visit: mockAvailableVisit,
    isLast: false,
    onClick: () => {
      console.log('Visit clicked');
    },
  },
};

export const Missed: Story = {
  args: {
    visit: mockMissedVisit,
    isLast: false,
    onClick: () => {
      console.log('Visit clicked');
    },
  },
};

export const Cancelled: Story = {
  args: {
    visit: mockCancelledVisit,
    isLast: false,
    onClick: () => {
      console.log('Visit clicked');
    },
  },
};

export const WithDoula: Story = {
  args: {
    visit: mockCompletedVisit,
    isLast: false,
    onClick: () => {
      console.log('Visit clicked');
    },
  },
};

export const WithoutDoula: Story = {
  args: {
    visit: mockAvailableVisit,
    isLast: false,
    onClick: () => {
      console.log('Visit clicked');
    },
  },
};

export const LastItem: Story = {
  args: {
    visit: mockCompletedVisit,
    isLast: true,
    onClick: () => {
      console.log('Visit clicked');
    },
  },
};

export const InitialVisit: Story = {
  args: {
    visit: mockInitialVisit,
    isLast: false,
    onClick: () => {
      console.log('Visit clicked');
    },
  },
};
