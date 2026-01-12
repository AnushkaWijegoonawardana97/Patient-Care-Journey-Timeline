import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * SkipLink component for keyboard navigation
 * Allows users to skip to main content, navigation, etc.
 * Only visible when focused
 */
export const SkipLink: React.FC<SkipLinkProps> = ({ href, children, className }) => {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999]',
        'focus:px-4 focus:py-2 focus:bg-primary focus:text-white',
        'focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'focus:font-semibold focus:block',
        className
      )}
    >
      {children}
    </a>
  );
};

export default SkipLink;
