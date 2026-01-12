import { authHandlers } from "./auth.handlers";
import { journeyHandlers } from "./journey.handlers";
import { addOnServicesHandlers } from "./addOnServices.handlers";

export const handlers = [...authHandlers, ...journeyHandlers, ...addOnServicesHandlers];
