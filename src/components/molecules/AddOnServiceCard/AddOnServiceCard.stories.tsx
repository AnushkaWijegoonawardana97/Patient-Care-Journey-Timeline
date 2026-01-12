import type { Meta, StoryObj } from '@storybook/react';
import { AddOnServiceCard } from './AddOnServiceCard';
import { Moon, Heart, Activity } from 'lucide-react';
import type { AddOnService } from '@/types/addOnServices';

const meta: Meta<typeof AddOnServiceCard> = {
  title: 'Molecules/AddOnServiceCard',
  component: AddOnServiceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    service: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddOnServiceCard>;

const mockOptionalService: AddOnService = {
  id: 'overnight-doula',
  name: 'Overnight Doula Care',
  icon: Moon,
  description: 'Receive additional support during overnight hours to help you rest and recover while ensuring your baby\'s needs are met.',
  status: 'optional_addon',
  imageUrl: '/overnight-doula-image.jpg',
};

const mockComingSoonService: AddOnService = {
  id: 'acupuncture',
  name: 'Acupuncture',
  icon: Activity,
  description: 'Support your wellness journey with traditional acupuncture techniques designed to promote relaxation and balance.',
  status: 'coming_soon',
  imageUrl: '/login-page-image.jpg',
};

const mockServiceWithoutImage: AddOnService = {
  id: 'postpartum-massage',
  name: 'Postpartum Massage',
  icon: Heart,
  description: 'Therapeutic massage designed to support your body\'s recovery after birth and ease muscle tension.',
  status: 'optional_addon',
};

export const OptionalAddon: Story = {
  args: {
    service: mockOptionalService,
  },
};

export const ComingSoon: Story = {
  args: {
    service: mockComingSoonService,
  },
};

export const WithImage: Story = {
  args: {
    service: mockOptionalService,
  },
};

export const WithoutImage: Story = {
  args: {
    service: mockServiceWithoutImage,
  },
};

export const Mobile: Story = {
  args: {
    service: mockOptionalService,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Desktop: Story = {
  args: {
    service: mockOptionalService,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
