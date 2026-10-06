import api from './api';
import { ApiResponse, Banner } from '../types';

export const bannerApi = {
  getPublic: async (): Promise<ApiResponse<Banner[]>> => {
    const res = await api.get<ApiResponse<Banner[]>>('/banners');
    return res.data;
  },
  getAdmin: async (): Promise<ApiResponse<Banner[]>> => {
    const res = await api.get<ApiResponse<Banner[]>>('/banners/admin/all');
    return res.data;
  },
  create: async (data: Partial<Banner>): Promise<ApiResponse<Banner>> => {
    const res = await api.post<ApiResponse<Banner>>('/banners', data);
    return res.data;
  },
  delete: async (id: string): Promise<ApiResponse<any>> => {
    const res = await api.delete(`/banners/${id}`);
    return res.data;
  }
};
