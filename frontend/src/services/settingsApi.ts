import api from './api';
import { ApiResponse } from '../types';

export const settingsApi = {
  getPublicSettings: async (): Promise<ApiResponse<Record<string, any>>> => {
    const res = await api.get<ApiResponse<Record<string, any>>>('/settings/public');
    return res.data;
  },
  getAdminSettings: async (): Promise<ApiResponse<any[]>> => {
    const res = await api.get<ApiResponse<any[]>>('/settings/admin');
    return res.data;
  },
  updateSetting: async (key: string, setting_value: any, description?: string): Promise<ApiResponse<any>> => {
    const res = await api.put<ApiResponse<any>>(`/settings/admin/${key}`, { setting_value, description });
    return res.data;
  },
  getSeo: async (path: string): Promise<ApiResponse<any>> => {
    const res = await api.get<ApiResponse<any>>('/seo/page', { params: { path } });
    return res.data;
  },
  getAdminSeo: async (): Promise<ApiResponse<any[]>> => {
    const res = await api.get<ApiResponse<any[]>>('/seo/admin/all');
    return res.data;
  },
  saveSeo: async (data: any): Promise<ApiResponse<any>> => {
    const res = await api.post<ApiResponse<any>>('/seo/admin', data);
    return res.data;
  }
};
