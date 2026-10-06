import api from './api';
import { ApiResponse, GalleryItem } from '../types';

export const galleryApi = {
  getPublic: async (): Promise<ApiResponse<GalleryItem[]>> => {
    const res = await api.get<ApiResponse<GalleryItem[]>>('/gallery');
    return res.data;
  },
  getAdminAll: async (): Promise<ApiResponse<GalleryItem[]>> => {
    const res = await api.get<ApiResponse<GalleryItem[]>>('/gallery/admin/all');
    return res.data;
  },
  create: async (data: Partial<GalleryItem>): Promise<ApiResponse<GalleryItem>> => {
    const res = await api.post<ApiResponse<GalleryItem>>('/gallery', data);
    return res.data;
  },
  update: async (id: string, data: Partial<GalleryItem>): Promise<ApiResponse<GalleryItem>> => {
    const res = await api.put<ApiResponse<GalleryItem>>(`/gallery/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.delete<ApiResponse<null>>(`/gallery/${id}`);
    return res.data;
  }
};
