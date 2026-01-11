/** Centralized query key factory for consistent cache management */
export const queryKeys = {
  /** Auth related keys */
  auth: {
    all: ["auth"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
  },

  /** Journey related keys */
  journey: {
    all: ["journey"] as const,
    patient: () => [...queryKeys.journey.all, "patient"] as const,
    visits: () => [...queryKeys.journey.all, "visits"] as const,
    visit: (id: string) => [...queryKeys.journey.visits(), id] as const,
  },

  /** Add-on services related keys */
  addOnServices: {
    all: ["addOnServices"] as const,
    list: () => [...queryKeys.addOnServices.all, "list"] as const,
  },
};

export default queryKeys;
