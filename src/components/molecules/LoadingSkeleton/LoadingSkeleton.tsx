import * as React from "react";
import { cn } from "@/lib/utils";

export type SkeletonVariant = "dashboard" | "journey" | "services" | "cards" | "list";

export interface LoadingSkeletonProps {
  variant: SkeletonVariant;
  count?: number;
  className?: string;
}

/** Skeleton block component */
const SkeletonBlock: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("bg-gray-200 rounded", className)} />
);

/** Dashboard skeleton layout */
const DashboardSkeleton: React.FC = () => (
  <div className="space-y-4 lg:space-y-6 mt-6 lg:mt-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      <SkeletonBlock className="lg:col-span-2 h-48" />
      <SkeletonBlock className="h-48" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <SkeletonBlock key={i} className="h-32" />
      ))}
    </div>
    <SkeletonBlock className="h-64" />
  </div>
);

/** Journey/Timeline skeleton layout */
const JourneySkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Header skeleton */}
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-4">
        <SkeletonBlock className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <SkeletonBlock className="h-6 w-48 mb-2" />
          <SkeletonBlock className="h-4 w-64" />
        </div>
      </div>
    </div>

    {/* Timeline skeleton */}
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <SkeletonBlock className="h-8 w-48 mb-6" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="relative pl-12 pb-8">
          <SkeletonBlock className="absolute left-4 top-1 w-4 h-4 rounded-full" />
          <div className="bg-gray-100 rounded-lg p-4">
            <SkeletonBlock className="h-5 w-48 mb-2" />
            <SkeletonBlock className="h-4 w-32" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/** Services grid skeleton layout */
const ServicesSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <div>
    <SkeletonBlock className="h-8 w-48 mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <SkeletonBlock className="w-full aspect-square mb-4" />
          <SkeletonBlock className="h-5 w-3/4 mb-2" />
          <SkeletonBlock className="h-4 w-1/2 mb-4" />
          <SkeletonBlock className="h-4 w-full mb-1" />
          <SkeletonBlock className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  </div>
);

/** Generic cards skeleton layout */
const CardsSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
      >
        <SkeletonBlock className="h-6 w-3/4 mb-3" />
        <SkeletonBlock className="h-4 w-1/2 mb-2" />
        <SkeletonBlock className="h-4 w-full" />
      </div>
    ))}
  </div>
);

/** List skeleton layout */
const ListSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <SkeletonBlock className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1">
          <SkeletonBlock className="h-5 w-1/3 mb-2" />
          <SkeletonBlock className="h-4 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant,
  count = 6,
  className,
}) => {
  return (
    <div className={cn("animate-pulse", className)}>
      {variant === "dashboard" && <DashboardSkeleton />}
      {variant === "journey" && <JourneySkeleton />}
      {variant === "services" && <ServicesSkeleton count={count} />}
      {variant === "cards" && <CardsSkeleton count={count} />}
      {variant === "list" && <ListSkeleton count={count} />}
    </div>
  );
};

export default LoadingSkeleton;
