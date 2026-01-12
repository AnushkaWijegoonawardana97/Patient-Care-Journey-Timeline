import type { Meta, StoryObj } from '@storybook/react';
import { SkipLink } from './SkipLink';

const meta = {
  title: 'Atoms/SkipLink',
  component: SkipLink,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'SkipLink component for keyboard navigation. Allows users to skip to main content or navigation. Only visible when focused.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#main',
    children: 'Skip to main content',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default skip link that skips to main content. Press Tab to see it appear.',
      },
    },
  },
};

export const SkipToNavigation: Story = {
  args: {
    href: '#navigation',
    children: 'Skip to navigation',
  },
};

export const MultipleSkipLinks: Story = {
  render: () => (
    <div>
      <SkipLink href="#main">Skip to main content</SkipLink>
      <SkipLink href="#navigation">Skip to navigation</SkipLink>
      <nav id="navigation">
        <h2>Navigation</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
      <main id="main">
        <h1>Main Content</h1>
        <p>This is the main content area.</p>
      </main>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple skip links for different sections of the page.',
      },
    },
  },
};
