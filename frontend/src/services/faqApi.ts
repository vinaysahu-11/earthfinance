import api from './api';
import { ApiResponse, Faq } from '../types';

export const faqApi = {
  getPublic: async (): Promise<ApiResponse<Faq[]>> => {
    const res = await api.get<ApiResponse<Faq[]>>('/faqs');
    return res.data;
  },
  getAdmin: async (): Promise<ApiResponse<Faq[]>> => {
    const res = await api.get<ApiResponse<Faq[]>>('/faqs/admin/all');
    return res.data;
  },
  create: async (data: Partial<Faq>): Promise<ApiResponse<Faq>> => {
    const res = await api.post<ApiResponse<Faq>>('/faqs', data);
    return res.data;
  },
  update: async (id: string, data: Partial<Faq>): Promise<ApiResponse<Faq>> => {
    const res = await api.put<ApiResponse<Faq>>(`/faqs/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<ApiResponse<any>> => {
    const res = await api.delete(`/faqs/${id}`);
    return res.data;
  }
};
