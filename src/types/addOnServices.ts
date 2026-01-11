import type { LucideIcon } from "lucide-react";

export type AddOnServiceStatus = "coming_soon" | "optional_addon";

/** API response type - no UI dependencies */
export interface AddOnServiceApi {
  id: string;
  name: string;
  iconName: string;
  description: string;
  status: AddOnServiceStatus;
  imageUrl?: string;
}

/** UI type with LucideIcon component */
export interface AddOnService {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  status: AddOnServiceStatus;
  imageUrl?: string;
}
