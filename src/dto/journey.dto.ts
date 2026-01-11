import type { Patient, Doula, Visit, Milestone, PatientJourney } from "@/types/journey";

/** Patient DTO from API */
export interface PatientDTO {
  id: string;
  name: string;
  due_date: string;
  insurance_type: "standard" | "medi-cal";
  care_pathway: "labor_delivery" | "pregnancy_loss";
  current_week: number;
}

/** Doula DTO from API */
export interface DoulaDTO {
  id: string;
  name: string;
  photo: string;
  languages: string[];
}

/** Visit DTO from API */
export interface VisitDTO {
  id: string;
  type: "initial" | "prenatal_postpartum" | "extended_postpartum" | "labor_delivery" | "pregnancy_loss" | "additional_postpartum";
  visitNumber: number;
  totalOfType: number;
  status: "available" | "scheduled" | "completed" | "missed" | "cancelled";
  scheduledDate?: string;
  completedDate?: string;
  doula?: DoulaDTO;
  notes?: string;
  durationMinutes?: number;
}

/** Milestone DTO from API */
export interface MilestoneDTO {
  id: string;
  type: "trimester" | "due_date" | "postpartum_week" | "custom";
  title: string;
  date: string;
  description?: string;
}

/** Patient Journey response DTO from API */
export interface PatientJourneyResponseDTO {
  patient: PatientDTO;
  visits: VisitDTO[];
  milestones: MilestoneDTO[];
}

/** Transform API Patient DTO to domain */
export function toPatient(dto: PatientDTO): Patient {
  return {
    id: dto.id,
    name: dto.name,
    dueDate: dto.due_date,
    insuranceType: dto.insurance_type,
    carePathway: dto.care_pathway,
    currentWeek: dto.current_week,
  };
}

/** Transform API Doula DTO to domain */
export function toDoula(dto: DoulaDTO): Doula {
  return {
    id: dto.id,
    name: dto.name,
    photo: dto.photo,
    languages: dto.languages,
  };
}

/** Transform API Visit DTO to domain */
export function toVisit(dto: VisitDTO): Visit {
  return {
    id: dto.id,
    type: dto.type,
    visitNumber: dto.visitNumber,
    totalOfType: dto.totalOfType,
    status: dto.status,
    scheduledDate: dto.scheduledDate,
    completedDate: dto.completedDate,
    doula: dto.doula ? toDoula(dto.doula) : undefined,
    notes: dto.notes,
    durationMinutes: dto.durationMinutes,
  };
}

/** Transform API Milestone DTO to domain */
export function toMilestone(dto: MilestoneDTO): Milestone {
  return {
    id: dto.id,
    type: dto.type,
    title: dto.title,
    date: dto.date,
    description: dto.description,
  };
}

/** Transform API PatientJourney response to domain */
export function toPatientJourney(dto: PatientJourneyResponseDTO): PatientJourney {
  return {
    patient: toPatient(dto.patient),
    visits: dto.visits.map(toVisit),
    milestones: dto.milestones.map(toMilestone),
  };
}
