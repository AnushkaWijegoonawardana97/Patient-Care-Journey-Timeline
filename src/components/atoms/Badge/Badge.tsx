import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-white dark:bg-primary dark:text-white",
        secondary: "bg-secondary-success text-white dark:bg-secondary-success dark:text-white",
        outline: "text-text-primary border border-border dark:text-card-foreground dark:border-border",
        success: "bg-secondary-light text-secondary-emphasis dark:bg-secondary-success/20 dark:text-secondary-accent",
        warning: "bg-tertiary-warning text-white dark:bg-tertiary-warning dark:text-white",
        error: "bg-tertiary-error text-white dark:bg-tertiary-error dark:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
