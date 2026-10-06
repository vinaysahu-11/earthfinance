import api from './api';
import { ApiResponse, ContactMessage } from '../types';

export const contactApi = {
  submitMessage: async (data: { name: string; email: string; phone?: string; subject?: string; message: string }): Promise<ApiResponse<ContactMessage>> => {
    const res = await api.post<ApiResponse<ContactMessage>>('/contact', data);
    return res.data;
  },
  getAdminMessages: async (params?: { page?: number; limit?: number }): Promise<ApiResponse<ContactMessage[]>> => {
    const res = await api.get<ApiResponse<ContactMessage[]>>('/contact/admin/all', { params });
    return res.data;
  },
  updateStatus: async (id: string, status?: string, is_replied?: boolean): Promise<ApiResponse<ContactMessage>> => {
    const res = await api.patch<ApiResponse<ContactMessage>>(`/contact/admin/${id}/status`, { status, is_replied });
    return res.data;
  }
};
