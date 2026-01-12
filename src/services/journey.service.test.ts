import { describe, it, expect, vi, beforeEach } from 'vitest';
import { journeyService } from './journey.service';
import * as apiClient from './api';
import * as journeyDto from '@/dto/journey.dto';
import type { PatientJourney, Visit } from '@/types/journey';

// Mock apiClient
vi.mock('./api', () => ({
  default: {
    get: vi.fn(),
  },
}));

// Mock DTO transformation functions
vi.mock('@/dto/journey.dto', () => ({
  toPatientJourney: vi.fn(),
  toVisit: vi.fn(),
}));

describe('journeyService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPatientJourney', () => {
    it('should call correct API endpoint', async () => {
      const mockResponse = {
        data: {
          patient: {},
          visits: [],
          milestones: [],
        },
      };
      const mockJourney: PatientJourney = {
        patient: {
          id: 'pt_001',
          name: 'Test Patient',
          dueDate: '2025-03-15',
          insuranceType: 'standard',
          carePathway: 'labor_delivery',
          currentWeek: 20,
        },
        visits: [],
        milestones: [],
      };

      vi.mocked(apiClient.default.get).mockResolvedValue(mockResponse);
      vi.mocked(journeyDto.toPatientJourney).mockReturnValue(mockJourney);

      const result = await journeyService.getPatientJourney();

      expect(apiClient.default.get).toHaveBeenCalledWith('/journey');
      expect(result).toEqual(mockJourney);
    });

    it('should transform DTO to domain model correctly', async () => {
      const mockResponse = {
        data: {
          patient: {
            id: 'pt_001',
            name: 'Test Patient',
            due_date: '2025-03-15',
            insurance_type: 'standard',
            care_pathway: 'labor_delivery',
            current_week: 20,
          },
          visits: [],
          milestones: [],
        },
      };
      const mockJourney: PatientJourney = {
        patient: {
          id: 'pt_001',
          name: 'Test Patient',
          dueDate: '2025-03-15',
          insuranceType: 'standard',
          carePathway: 'labor_delivery',
          currentWeek: 20,
        },
        visits: [],
        milestones: [],
      };

      vi.mocked(apiClient.default.get).mockResolvedValue(mockResponse);
      vi.mocked(journeyDto.toPatientJourney).mockReturnValue(mockJourney);

      const result = await journeyService.getPatientJourney();

      expect(journeyDto.toPatientJourney).toHaveBeenCalledWith(mockResponse.data);
      expect(result).toEqual(mockJourney);
    });

    it('should handle API errors gracefully', async () => {
      const mockError = new Error('API Error');
      vi.mocked(apiClient.default.get).mockRejectedValue(mockError);

      await expect(journeyService.getPatientJourney()).rejects.toThrow('API Error');
    });
  });

  describe('getVisitDetails', () => {
    it('should call correct API endpoint with ID', async () => {
      const visitId = 'v_001';
      const mockResponse = {
        data: {
          id: visitId,
          type: 'prenatal_postpartum',
          visit_number: 1,
          total_of_type: 8,
          status: 'scheduled',
        },
      };
      const mockVisit: Visit = {
        id: visitId,
        type: 'prenatal_postpartum',
        visitNumber: 1,
        totalOfType: 8,
        status: 'scheduled',
      };

      vi.mocked(apiClient.default.get).mockResolvedValue(mockResponse);
      vi.mocked(journeyDto.toVisit).mockReturnValue(mockVisit);

      const result = await journeyService.getVisitDetails(visitId);

      expect(apiClient.default.get).toHaveBeenCalledWith(`/journey/visits/${visitId}`);
      expect(result).toEqual(mockVisit);
    });

    it('should transform DTO to domain model correctly', async () => {
      const visitId = 'v_001';
      const mockResponse = {
        data: {
          id: visitId,
          type: 'prenatal_postpartum',
          visit_number: 1,
          total_of_type: 8,
          status: 'scheduled',
          scheduled_date: '2025-01-10T10:00:00Z',
        },
      };
      const mockVisit: Visit = {
        id: visitId,
        type: 'prenatal_postpartum',
        visitNumber: 1,
        totalOfType: 8,
        status: 'scheduled',
        scheduledDate: '2025-01-10T10:00:00Z',
      };

      vi.mocked(apiClient.default.get).mockResolvedValue(mockResponse);
      vi.mocked(journeyDto.toVisit).mockReturnValue(mockVisit);

      const result = await journeyService.getVisitDetails(visitId);

      expect(journeyDto.toVisit).toHaveBeenCalledWith(mockResponse.data);
      expect(result).toEqual(mockVisit);
    });

    it('should handle API errors gracefully', async () => {
      const visitId = 'v_001';
      const mockError = new Error('API Error');
      vi.mocked(apiClient.default.get).mockRejectedValue(mockError);

      await expect(journeyService.getVisitDetails(visitId)).rejects.toThrow('API Error');
    });
  });
});
