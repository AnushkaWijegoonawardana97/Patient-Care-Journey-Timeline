import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Heart } from 'lucide-react';
import { addOnServicesService } from './addOnServices.service';
import * as apiClient from './api';
import * as addOnServicesDto from '@/dto/addOnServices.dto';
import type { AddOnService } from '@/types/addOnServices';

// Mock apiClient
vi.mock('./api', () => ({
  default: {
    get: vi.fn(),
  },
}));

// Mock DTO transformation functions
vi.mock('@/dto/addOnServices.dto', () => ({
  toAddOnServices: vi.fn(),
}));

describe('addOnServicesService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAddOnServices', () => {
    it('should call correct API endpoint', async () => {
      const mockResponse = {
        data: [
          {
            id: 's_001',
            name: 'Lactation Support',
            description: 'Professional lactation consultation',
            imageUrl: '/lactation.jpg',
            status: 'optional_addon',
          },
        ],
      };
      const mockServices: AddOnService[] = [
        {
          id: 's_001',
          name: 'Lactation Support',
          description: 'Professional lactation consultation',
          imageUrl: '/lactation.jpg',
          status: 'optional_addon',
          icon: Heart,
        },
      ];

      vi.mocked(apiClient.default.get).mockResolvedValue(mockResponse);
      vi.mocked(addOnServicesDto.toAddOnServices).mockReturnValue(mockServices);

      const result = await addOnServicesService.getAddOnServices();

      expect(apiClient.default.get).toHaveBeenCalledWith('/add-on-services');
      expect(result).toEqual(mockServices);
    });

    it('should transform DTO array to domain model array', async () => {
      const mockResponse = {
        data: [
          {
            id: 's_001',
            name: 'Lactation Support',
            description: 'Professional lactation consultation',
            imageUrl: '/lactation.jpg',
            status: 'optional_addon',
          },
          {
            id: 's_002',
            name: 'Mental Health Support',
            description: 'Counseling services',
            imageUrl: '/mental-health.jpg',
            status: 'coming_soon',
          },
        ],
      };
      const mockServices: AddOnService[] = [
        {
          id: 's_001',
          name: 'Lactation Support',
          description: 'Professional lactation consultation',
          imageUrl: '/lactation.jpg',
          status: 'optional_addon',
          icon: Heart,
        },
        {
          id: 's_002',
          name: 'Mental Health Support',
          description: 'Counseling services',
          imageUrl: '/mental-health.jpg',
          status: 'coming_soon',
          icon: Heart,
        },
      ];

      vi.mocked(apiClient.default.get).mockResolvedValue(mockResponse);
      vi.mocked(addOnServicesDto.toAddOnServices).mockReturnValue(mockServices);

      const result = await addOnServicesService.getAddOnServices();

      expect(addOnServicesDto.toAddOnServices).toHaveBeenCalledWith(mockResponse.data);
      expect(result).toEqual(mockServices);
      expect(result).toHaveLength(2);
    });

    it('should handle API errors gracefully', async () => {
      const mockError = new Error('API Error');
      vi.mocked(apiClient.default.get).mockRejectedValue(mockError);

      await expect(addOnServicesService.getAddOnServices()).rejects.toThrow('API Error');
    });

    it('should handle empty array response', async () => {
      const mockResponse = {
        data: [],
      };
      const mockServices: AddOnService[] = [];

      vi.mocked(apiClient.default.get).mockResolvedValue(mockResponse);
      vi.mocked(addOnServicesDto.toAddOnServices).mockReturnValue(mockServices);

      const result = await addOnServicesService.getAddOnServices();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
