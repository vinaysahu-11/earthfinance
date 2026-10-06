import api from './api';
import { ApiResponse, BlogPost } from '../types';

export const blogApi = {
  getPublic: async (): Promise<ApiResponse<BlogPost[]>> => {
    const res = await api.get<ApiResponse<BlogPost[]>>('/blog');
    return res.data;
  },
  getBySlug: async (slug: string): Promise<ApiResponse<BlogPost>> => {
    const res = await api.get<ApiResponse<BlogPost>>(`/blog/${slug}`);
    return res.data;
  },
  getAdmin: async (): Promise<ApiResponse<BlogPost[]>> => {
    const res = await api.get<ApiResponse<BlogPost[]>>('/blog/admin/all');
    return res.data;
  },
  create: async (data: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> => {
    const res = await api.post<ApiResponse<BlogPost>>('/blog', data);
    return res.data;
  },
  update: async (id: string, data: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> => {
    const res = await api.put<ApiResponse<BlogPost>>(`/blog/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<ApiResponse<any>> => {
    const res = await api.delete(`/blog/${id}`);
    return res.data;
  }
};
