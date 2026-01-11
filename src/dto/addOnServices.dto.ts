import {
  Activity,
  Bone,
  Moon,
  Hand,
  Heart,
  Target,
  HelpCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AddOnService, AddOnServiceApi, AddOnServiceStatus } from "@/types/addOnServices";

/** Add-on service DTO from API */
export interface AddOnServiceDTO {
  id: string;
  name: string;
  icon_name: string;
  description: string;
  status: AddOnServiceStatus;
  image_url?: string;
}

/** Icon name to component mapping */
const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  bone: Bone,
  moon: Moon,
  hand: Hand,
  heart: Heart,
  target: Target,
};

/** Get icon component from name */
function getIconByName(iconName: string): LucideIcon {
  return iconMap[iconName.toLowerCase()] || HelpCircle;
}

/** Transform API Add-on Service DTO to API type */
export function toAddOnServiceApi(dto: AddOnServiceDTO): AddOnServiceApi {
  return {
    id: dto.id,
    name: dto.name,
    iconName: dto.icon_name,
    description: dto.description,
    status: dto.status,
    imageUrl: dto.image_url,
  };
}

/** Transform API Add-on Service DTO to UI type with icon component */
export function toAddOnService(dto: AddOnServiceDTO): AddOnService {
  return {
    id: dto.id,
    name: dto.name,
    icon: getIconByName(dto.icon_name),
    description: dto.description,
    status: dto.status,
    imageUrl: dto.image_url,
  };
}

/** Transform array of API DTOs to UI types */
export function toAddOnServices(dtos: AddOnServiceDTO[]): AddOnService[] {
  return dtos.map(toAddOnService);
}
