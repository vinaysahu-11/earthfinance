import api from './api';
import { ApiResponse, Review } from '../types';

export const reviewApi = {
  submitReview: async (data: { name: string; photo?: string | null; rating: number; review: string; profession?: string; business?: string }): Promise<ApiResponse<Review>> => {
    const res = await api.post<ApiResponse<Review>>('/reviews', data);
    return res.data;
  },

  getPublicReviews: async (): Promise<ApiResponse<Review[]>> => {
    const res = await api.get<ApiResponse<Review[]>>('/reviews');
    return res.data;
  },

  getAdminReviews: async (params?: { page?: number; limit?: number; status?: string }): Promise<ApiResponse<Review[]>> => {
    const res = await api.get<ApiResponse<Review[]>>('/reviews/admin/all', { params });
    return res.data;
  },

  updateStatus: async (id: string, status: string): Promise<ApiResponse<Review>> => {
    const res = await api.patch<ApiResponse<Review>>(`/reviews/${id}/status`, { status });
    return res.data;
  },

  deleteReview: async (id: string): Promise<ApiResponse<any>> => {
    const res = await api.delete(`/reviews/${id}`);
    return res.data;
  }
};
