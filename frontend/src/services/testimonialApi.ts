import api from './api';
import { ApiResponse, Testimonial } from '../types';

export const testimonialApi = {
  getPublic: async (): Promise<ApiResponse<Testimonial[]>> => {
    const res = await api.get<ApiResponse<Testimonial[]>>('/testimonials');
    return res.data;
  },
  getAdmin: async (): Promise<ApiResponse<Testimonial[]>> => {
    const res = await api.get<ApiResponse<Testimonial[]>>('/testimonials/admin/all');
    return res.data;
  },
  create: async (data: Partial<Testimonial>): Promise<ApiResponse<Testimonial>> => {
    const res = await api.post<ApiResponse<Testimonial>>('/testimonials', data);
    return res.data;
  },
  delete: async (id: string): Promise<ApiResponse<any>> => {
    const res = await api.delete(`/testimonials/${id}`);
    return res.data;
  }
};
