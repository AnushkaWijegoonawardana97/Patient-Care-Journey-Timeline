import type { Meta, StoryObj } from '@storybook/react';
import { VisitDetailDrawer } from './VisitDetailDrawer';
import type { Visit } from '@/types/journey';

const meta: Meta<typeof VisitDetailDrawer> = {
  title: 'Organisms/VisitDetailDrawer',
  component: VisitDetailDrawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VisitDetailDrawer>;

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
  notes: 'Reviewed nutrition and exercise. Patient feeling well. Discussed birth plan preferences.',
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

const mockVisitWithNotes: Visit = {
  id: 'v_003',
  type: 'initial',
  visitNumber: 1,
  totalOfType: 1,
  status: 'completed',
  completedDate: '2024-10-01T10:00:00Z',
  scheduledDate: '2024-10-01T10:00:00Z',
  doula: {
    id: 'd_001',
    name: 'Angela Rivera',
    photo: '/doula-avatar.JPG',
    languages: ['English', 'Spanish'],
  },
  notes: 'Discussed birth preferences and created initial care plan. Patient is excited and well-prepared.',
  durationMinutes: 60,
};

const mockVisitWithoutDoula: Visit = {
  id: 'v_004',
  type: 'prenatal_postpartum',
  visitNumber: 4,
  totalOfType: 8,
  status: 'scheduled',
  scheduledDate: '2025-02-15T14:00:00Z',
};

export const Open: Story = {
  args: {
    visit: mockCompletedVisit,
    isOpen: true,
    onClose: () => {
      console.log('Drawer closed');
    },
  },
};

export const Closed: Story = {
  args: {
    visit: mockCompletedVisit,
    isOpen: false,
    onClose: () => {
      console.log('Drawer closed');
    },
  },
};

export const CompletedVisit: Story = {
  args: {
    visit: mockCompletedVisit,
    isOpen: true,
    onClose: () => {
      console.log('Drawer closed');
    },
  },
};

export const ScheduledVisit: Story = {
  args: {
    visit: mockScheduledVisit,
    isOpen: true,
    onClose: () => {
      console.log('Drawer closed');
    },
  },
};

export const WithDoula: Story = {
  args: {
    visit: mockCompletedVisit,
    isOpen: true,
    onClose: () => {
      console.log('Drawer closed');
    },
  },
};

export const WithNotes: Story = {
  args: {
    visit: mockVisitWithNotes,
    isOpen: true,
    onClose: () => {
      console.log('Drawer closed');
    },
  },
};

export const WithoutDoula: Story = {
  args: {
    visit: mockVisitWithoutDoula,
    isOpen: true,
    onClose: () => {
      console.log('Drawer closed');
    },
  },
};
