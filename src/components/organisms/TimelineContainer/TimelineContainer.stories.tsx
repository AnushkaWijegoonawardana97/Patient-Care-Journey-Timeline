import type { Meta, StoryObj } from '@storybook/react';
import { TimelineContainer } from './TimelineContainer';
import type { Patient, Visit, Milestone } from '@/types/journey';

const meta: Meta<typeof TimelineContainer> = {
  title: 'Organisms/TimelineContainer',
  component: TimelineContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Timeline container that displays visits and milestones in chronological order. Supports insurance-based filtering and care pathway filtering.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onVisitClick: {
      action: 'visit clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimelineContainer>;

const mockStandardPatient: Patient = {
  id: 'pt_001',
  name: 'Maria Santos',
  dueDate: '2025-03-15',
  insuranceType: 'standard',
  carePathway: 'labor_delivery',
  currentWeek: 28,
};

const mockMediCalPatient: Patient = {
  id: 'pt_002',
  name: 'Sarah Johnson',
  dueDate: '2025-04-20',
  insuranceType: 'medi-cal',
  carePathway: 'labor_delivery',
  currentWeek: 32,
};

const mockPregnancyLossPatient: Patient = {
  id: 'pt_003',
  name: 'Emily Chen',
  dueDate: '2025-02-10',
  insuranceType: 'standard',
  carePathway: 'pregnancy_loss',
  currentWeek: 20,
};

const mockVisits: Visit[] = [
  {
    id: 'v_001',
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
  },
  {
    id: 'v_002',
    type: 'prenatal_postpartum',
    visitNumber: 1,
    totalOfType: 8,
    status: 'completed',
    completedDate: '2024-10-15T14:00:00Z',
    doula: {
      id: 'd_001',
      name: 'Angela Rivera',
      photo: '/doula-avatar.JPG',
      languages: ['English', 'Spanish'],
    },
    notes: 'Reviewed nutrition and exercise.',
    durationMinutes: 45,
  },
  {
    id: 'v_003',
    type: 'prenatal_postpartum',
    visitNumber: 2,
    totalOfType: 8,
    status: 'completed',
    completedDate: '2024-11-01T11:00:00Z',
    doula: {
      id: 'd_001',
      name: 'Angela Rivera',
      photo: '/doula-avatar.JPG',
      languages: ['English', 'Spanish'],
    },
    durationMinutes: 45,
  },
  {
    id: 'v_004',
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
  },
  {
    id: 'v_005',
    type: 'prenatal_postpartum',
    visitNumber: 4,
    totalOfType: 8,
    status: 'available',
  },
  {
    id: 'v_006',
    type: 'labor_delivery',
    visitNumber: 1,
    totalOfType: 1,
    status: 'available',
  },
];

const mockMediCalVisits: Visit[] = [
  ...mockVisits,
  {
    id: 'v_007',
    type: 'additional_postpartum',
    visitNumber: 1,
    totalOfType: 9,
    status: 'available',
  },
  {
    id: 'v_008',
    type: 'additional_postpartum',
    visitNumber: 2,
    totalOfType: 9,
    status: 'available',
  },
];

const mockPregnancyLossVisits: Visit[] = [
  {
    id: 'v_001',
    type: 'initial',
    visitNumber: 1,
    totalOfType: 1,
    status: 'completed',
    completedDate: '2024-10-01T10:00:00Z',
  },
  {
    id: 'v_002',
    type: 'pregnancy_loss',
    visitNumber: 1,
    totalOfType: 1,
    status: 'scheduled',
    scheduledDate: '2025-01-15T10:00:00Z',
  },
];

const mockMilestones: Milestone[] = [
  {
    id: 'm_001',
    type: 'trimester',
    title: 'Second Trimester',
    date: '2024-09-15',
    description: 'Weeks 14-27',
  },
  {
    id: 'm_002',
    type: 'trimester',
    title: 'Third Trimester',
    date: '2024-12-15',
    description: 'Weeks 28-40',
  },
  {
    id: 'm_003',
    type: 'due_date',
    title: 'Due Date',
    date: '2025-03-15',
  },
  {
    id: 'm_004',
    type: 'postpartum_week',
    title: '6 Weeks Postpartum',
    date: '2025-04-26',
  },
];

export const StandardInsurance: Story = {
  args: {
    patient: mockStandardPatient,
    visits: mockVisits,
    milestones: mockMilestones,
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline for standard insurance patient. Additional postpartum visits are filtered out.',
      },
    },
  },
};

export const MediCalInsurance: Story = {
  args: {
    patient: mockMediCalPatient,
    visits: mockMediCalVisits,
    milestones: mockMilestones,
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline for Medi-Cal insurance patient. Includes additional 9 postpartum visits.',
      },
    },
  },
};

export const LaborDeliveryPathway: Story = {
  args: {
    patient: mockStandardPatient,
    visits: mockVisits,
    milestones: mockMilestones,
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline for labor & delivery care pathway. Pregnancy loss visits are filtered out.',
      },
    },
  },
};

export const PregnancyLossPathway: Story = {
  args: {
    patient: mockPregnancyLossPatient,
    visits: mockPregnancyLossVisits,
    milestones: [
      {
        id: 'm_001',
        type: 'trimester',
        title: 'Second Trimester',
        date: '2024-09-15',
        description: 'Weeks 14-27',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline for pregnancy loss care pathway. Labor & delivery visits are filtered out.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    patient: mockStandardPatient,
    visits: [],
    milestones: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no visits or milestones are available.',
      },
    },
  },
};

export const WithManyItems: Story = {
  args: {
    patient: mockMediCalPatient,
    visits: [
      ...mockMediCalVisits,
      {
        id: 'v_009',
        type: 'prenatal_postpartum',
        visitNumber: 5,
        totalOfType: 8,
        status: 'available',
      },
      {
        id: 'v_010',
        type: 'prenatal_postpartum',
        visitNumber: 6,
        totalOfType: 8,
        status: 'available',
      },
      {
        id: 'v_011',
        type: 'prenatal_postpartum',
        visitNumber: 7,
        totalOfType: 8,
        status: 'available',
      },
      {
        id: 'v_012',
        type: 'prenatal_postpartum',
        visitNumber: 8,
        totalOfType: 8,
        status: 'available',
      },
    ],
    milestones: mockMilestones,
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with many items showing the alternating layout on desktop.',
      },
    },
  },
};

export const Mobile: Story = {
  args: {
    patient: mockStandardPatient,
    visits: mockVisits,
    milestones: mockMilestones,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Timeline on mobile viewport showing vertical layout.',
      },
    },
  },
};

export const Desktop: Story = {
  args: {
    patient: mockStandardPatient,
    visits: mockVisits,
    milestones: mockMilestones,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Timeline on desktop viewport showing alternating layout with central timeline line.',
      },
    },
  },
};
