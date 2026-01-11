import * as React from "react";
import { Badge } from "@/components/atoms/Badge/Badge";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  phase: "First Trimester" | "Second Trimester" | "Third Trimester" | "Postpartum";
  className?: string;
}

const phaseColors = {
  "First Trimester": "bg-secondary-light text-secondary-emphasis",
  "Second Trimester": "bg-primary-light text-primary",
  "Third Trimester": "bg-tertiary-info text-primary-dark",
  Postpartum: "bg-secondary-accent text-secondary-emphasis",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ phase, className }) => {
  return (
    <Badge
      variant="outline"
      className={cn(phaseColors[phase], "border-0", className)}
    >
      {phase}
    </Badge>
  );
};

export default StatusBadge;
