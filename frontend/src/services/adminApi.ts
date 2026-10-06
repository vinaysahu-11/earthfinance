import api from './api';
import { ApiResponse, DashboardStats, AdminUser } from '../types';

export const adminApi = {
  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<{ token: string; user: AdminUser }>> => {
    const res = await api.post<ApiResponse<{ token: string; user: AdminUser }>>('/auth/login', credentials);
    return res.data;
  },

  getMe: async (): Promise<ApiResponse<AdminUser>> => {
    const res = await api.get<ApiResponse<AdminUser>>('/auth/me');
    return res.data;
  },

  logout: async (): Promise<ApiResponse<any>> => {
    const res = await api.post<ApiResponse<any>>('/auth/logout');
    return res.data;
  },

  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const res = await api.get<ApiResponse<DashboardStats>>('/admin/dashboard-stats');
    return res.data;
  },

  getStaff: async (): Promise<ApiResponse<AdminUser[]>> => {
    const res = await api.get<ApiResponse<AdminUser[]>>('/admin/staff');
    return res.data;
  },

  createStaff: async (data: { name: string; email: string; password: string; role: string }): Promise<ApiResponse<AdminUser>> => {
    const res = await api.post<ApiResponse<AdminUser>>('/admin/staff', data);
    return res.data;
  },

  updateStaffStatus: async (id: string, data: { is_active?: boolean; role?: string }): Promise<ApiResponse<AdminUser>> => {
    const res = await api.patch<ApiResponse<AdminUser>>(`/admin/staff/${id}`, data);
    return res.data;
  },

  getReports: async (): Promise<ApiResponse<any>> => {
    const res = await api.get('/reports');
    return res.data;
  }
};
