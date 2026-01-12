import type { Meta, StoryObj } from '@storybook/react';
import { JourneyStatusHeader } from './JourneyStatusHeader';
import type { Visit } from '@/types/journey';

const meta: Meta<typeof JourneyStatusHeader> = {
  title: 'Organisms/JourneyStatusHeader',
  component: JourneyStatusHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Header component showing patient journey progress, status, and insurance information.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JourneyStatusHeader>;

const createMockVisit = (overrides: Partial<Visit>): Visit => ({
  id: 'v_001',
  type: 'prenatal_postpartum',
  visitNumber: 1,
  totalOfType: 8,
  status: 'scheduled',
  scheduledDate: '2025-01-10T10:00:00Z',
  ...overrides,
});

export const EarlyPregnancy: Story = {
  args: {
    patient: {
      id: 'pt_001',
      name: 'Maria Santos',
      dueDate: '2025-03-15',
      insuranceType: 'standard',
      carePathway: 'labor_delivery',
      currentWeek: 12,
    },
    visits: [
      createMockVisit({ id: 'v_001', status: 'completed' }),
      createMockVisit({ id: 'v_002', status: 'scheduled' }),
      createMockVisit({ id: 'v_003', status: 'available' }),
      createMockVisit({ id: 'v_004', status: 'available' }),
      createMockVisit({ id: 'v_005', status: 'available' }),
      createMockVisit({ id: 'v_006', status: 'available' }),
      createMockVisit({ id: 'v_007', status: 'available' }),
      createMockVisit({ id: 'v_008', status: 'available' }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Early pregnancy with low progress (1 of 8 visits completed).',
      },
    },
  },
};

export const MidPregnancy: Story = {
  args: {
    patient: {
      id: 'pt_002',
      name: 'Sarah Johnson',
      dueDate: '2025-04-20',
      insuranceType: 'standard',
      carePathway: 'labor_delivery',
      currentWeek: 28,
    },
    visits: [
      createMockVisit({ id: 'v_001', status: 'completed' }),
      createMockVisit({ id: 'v_002', status: 'completed' }),
      createMockVisit({ id: 'v_003', status: 'completed' }),
      createMockVisit({ id: 'v_004', status: 'completed' }),
      createMockVisit({ id: 'v_005', status: 'scheduled' }),
      createMockVisit({ id: 'v_006', status: 'available' }),
      createMockVisit({ id: 'v_007', status: 'available' }),
      createMockVisit({ id: 'v_008', status: 'available' }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Mid pregnancy with medium progress (4 of 8 visits completed, 50%).',
      },
    },
  },
};

export const LatePregnancy: Story = {
  args: {
    patient: {
      id: 'pt_003',
      name: 'Emily Chen',
      dueDate: '2025-02-10',
      insuranceType: 'standard',
      carePathway: 'labor_delivery',
      currentWeek: 36,
    },
    visits: [
      createMockVisit({ id: 'v_001', status: 'completed' }),
      createMockVisit({ id: 'v_002', status: 'completed' }),
      createMockVisit({ id: 'v_003', status: 'completed' }),
      createMockVisit({ id: 'v_004', status: 'completed' }),
      createMockVisit({ id: 'v_005', status: 'completed' }),
      createMockVisit({ id: 'v_006', status: 'completed' }),
      createMockVisit({ id: 'v_007', status: 'completed' }),
      createMockVisit({ id: 'v_008', status: 'scheduled' }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Late pregnancy with high progress (7 of 8 visits completed, 87%).',
      },
    },
  },
};

export const Postpartum: Story = {
  args: {
    patient: {
      id: 'pt_004',
      name: 'Jessica Martinez',
      dueDate: '2025-01-15',
      insuranceType: 'standard',
      carePathway: 'labor_delivery',
      currentWeek: -6,
    },
    visits: [
      createMockVisit({ id: 'v_001', status: 'completed' }),
      createMockVisit({ id: 'v_002', status: 'completed' }),
      createMockVisit({ id: 'v_003', status: 'completed' }),
      createMockVisit({ id: 'v_004', status: 'completed' }),
      createMockVisit({ id: 'v_005', status: 'completed' }),
      createMockVisit({ id: 'v_006', status: 'completed' }),
      createMockVisit({ id: 'v_007', status: 'completed' }),
      createMockVisit({ id: 'v_008', status: 'completed' }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Postpartum phase (6 weeks postpartum) with all visits completed (100%).',
      },
    },
  },
};

export const StandardInsurance: Story = {
  args: {
    patient: {
      id: 'pt_005',
      name: 'Anna Williams',
      dueDate: '2025-05-01',
      insuranceType: 'standard',
      carePathway: 'labor_delivery',
      currentWeek: 20,
    },
    visits: [
      createMockVisit({ id: 'v_001', status: 'completed' }),
      createMockVisit({ id: 'v_002', status: 'completed' }),
      createMockVisit({ id: 'v_003', status: 'scheduled' }),
      createMockVisit({ id: 'v_004', status: 'available' }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard insurance plan. Additional postpartum visits are not included in count.',
      },
    },
  },
};

export const MediCalInsurance: Story = {
  args: {
    patient: {
      id: 'pt_006',
      name: 'Lisa Brown',
      dueDate: '2025-06-10',
      insuranceType: 'medi-cal',
      carePathway: 'labor_delivery',
      currentWeek: 24,
    },
    visits: [
      createMockVisit({ id: 'v_001', status: 'completed' }),
      createMockVisit({ id: 'v_002', status: 'completed' }),
      createMockVisit({ id: 'v_003', type: 'additional_postpartum', status: 'available' }),
      createMockVisit({ id: 'v_004', type: 'additional_postpartum', status: 'available' }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Medi-Cal insurance plan. Includes additional postpartum visits in the count.',
      },
    },
  },
};

export const ZeroProgress: Story = {
  args: {
    patient: {
      id: 'pt_007',
      name: 'New Patient',
      dueDate: '2025-07-01',
      insuranceType: 'standard',
      carePathway: 'labor_delivery',
      currentWeek: 8,
    },
    visits: [
      createMockVisit({ id: 'v_001', status: 'available' }),
      createMockVisit({ id: 'v_002', status: 'available' }),
      createMockVisit({ id: 'v_003', status: 'available' }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'New patient with no completed visits (0% progress).',
      },
    },
  },
};

export const AllCompleted: Story = {
  args: {
    patient: {
      id: 'pt_008',
      name: 'Completed Patient',
      dueDate: '2024-12-01',
      insuranceType: 'standard',
      carePathway: 'labor_delivery',
      currentWeek: -12,
    },
    visits: [
      createMockVisit({ id: 'v_001', status: 'completed' }),
      createMockVisit({ id: 'v_002', status: 'completed' }),
      createMockVisit({ id: 'v_003', status: 'completed' }),
      createMockVisit({ id: 'v_004', status: 'completed' }),
      createMockVisit({ id: 'v_005', status: 'completed' }),
      createMockVisit({ id: 'v_006', status: 'completed' }),
      createMockVisit({ id: 'v_007', status: 'completed' }),
      createMockVisit({ id: 'v_008', status: 'completed' }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Patient with all visits completed (100% progress).',
      },
    },
  },
};
