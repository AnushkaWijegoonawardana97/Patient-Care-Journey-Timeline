export type InsuranceType = "standard" | "medi-cal";
export type CarePathway = "labor_delivery" | "pregnancy_loss";
export type VisitType =
  | "initial"
  | "prenatal_postpartum"
  | "extended_postpartum"
  | "labor_delivery"
  | "pregnancy_loss"
  | "additional_postpartum";
export type VisitStatus = "available" | "scheduled" | "completed" | "missed" | "cancelled";
export type MilestoneType = "trimester" | "due_date" | "postpartum_week" | "custom";

export interface Doula {
  id: string;
  name: string;
  photo: string;
  languages: string[];
}

export interface Patient {
  id: string;
  name: string;
  dueDate: string;
  insuranceType: InsuranceType;
  carePathway: CarePathway;
  currentWeek: number;
}

export interface Visit {
  id: string;
  type: VisitType;
  visitNumber: number;
  totalOfType: number;
  status: VisitStatus;
  scheduledDate?: string;
  completedDate?: string;
  doula?: Doula;
  notes?: string;
  durationMinutes?: number;
}

export interface Milestone {
  id: string;
  type: MilestoneType;
  title: string;
  date: string;
  description?: string;
}

export interface PatientJourney {
  patient: Patient;
  visits: Visit[];
  milestones: Milestone[];
}
