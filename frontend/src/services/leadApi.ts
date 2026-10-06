import api from './api';
import { ApiResponse, Lead } from '../types';

export const leadApi = {
  createLead: async (data: Partial<Lead>): Promise<ApiResponse<Lead>> => {
    const res = await api.post<ApiResponse<Lead>>('/leads', data);
    return res.data;
  },

  getLeads: async (params?: { page?: number; limit?: number; status?: string; search?: string }): Promise<ApiResponse<Lead[]>> => {
    const res = await api.get<ApiResponse<Lead[]>>('/leads', { params });
    return res.data;
  },

  getLeadById: async (id: string): Promise<ApiResponse<{ lead: Lead; notes: any[]; statusHistory: any[]; appointments: any[] }>> => {
    const res = await api.get(`/leads/${id}`);
    return res.data;
  },

  updateStatus: async (id: string, status: string, remarks?: string): Promise<ApiResponse<any>> => {
    const res = await api.patch(`/leads/${id}/status`, { status, remarks });
    return res.data;
  },

  assignStaff: async (id: string, assigned_to: string | null): Promise<ApiResponse<any>> => {
    const res = await api.patch(`/leads/${id}/assign`, { assigned_to });
    return res.data;
  },

  addNote: async (id: string, note: string): Promise<ApiResponse<any>> => {
    const res = await api.post(`/leads/${id}/notes`, { note });
    return res.data;
  }
};
