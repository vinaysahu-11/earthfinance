import api from './api';
import { ApiResponse, Industry } from '../types';

export const industryApi = {
  getPublicIndustries: async (): Promise<ApiResponse<Industry[]>> => {
    const res = await api.get<ApiResponse<Industry[]>>('/industries');
    return res.data;
  },

  getIndustryBySlug: async (slug: string): Promise<ApiResponse<Industry>> => {
    const res = await api.get<ApiResponse<Industry>>(`/industries/${slug}`);
    return res.data;
  },

  getAdminIndustries: async (): Promise<ApiResponse<Industry[]>> => {
    const res = await api.get<ApiResponse<Industry[]>>('/industries/admin/all');
    return res.data;
  },

  createIndustry: async (data: Partial<Industry>): Promise<ApiResponse<Industry>> => {
    const res = await api.post<ApiResponse<Industry>>('/industries', data);
    return res.data;
  },

  updateIndustry: async (id: string, data: Partial<Industry>): Promise<ApiResponse<Industry>> => {
    const res = await api.put<ApiResponse<Industry>>(`/industries/${id}`, data);
    return res.data;
  },

  deleteIndustry: async (id: string): Promise<ApiResponse<any>> => {
    const res = await api.delete(`/industries/${id}`);
    return res.data;
  }
};
