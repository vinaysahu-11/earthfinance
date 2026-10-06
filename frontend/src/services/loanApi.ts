import api from './api';
import { ApiResponse, LoanProduct, LoanCategory } from '../types';

export const loanApi = {
  getPublicLoans: async (): Promise<ApiResponse<LoanProduct[]>> => {
    const res = await api.get<ApiResponse<LoanProduct[]>>('/loans');
    return res.data;
  },

  getLoanBySlug: async (slug: string): Promise<ApiResponse<LoanProduct>> => {
    const res = await api.get<ApiResponse<LoanProduct>>(`/loans/${slug}`);
    return res.data;
  },

  getCategories: async (): Promise<ApiResponse<LoanCategory[]>> => {
    const res = await api.get<ApiResponse<LoanCategory[]>>('/loans/categories');
    return res.data;
  },

  getAdminLoans: async (): Promise<ApiResponse<LoanProduct[]>> => {
    const res = await api.get<ApiResponse<LoanProduct[]>>('/loans/admin/all');
    return res.data;
  },

  createLoan: async (data: Partial<LoanProduct>): Promise<ApiResponse<LoanProduct>> => {
    const res = await api.post<ApiResponse<LoanProduct>>('/loans', data);
    return res.data;
  },

  updateLoan: async (id: string, data: Partial<LoanProduct>): Promise<ApiResponse<LoanProduct>> => {
    const res = await api.put<ApiResponse<LoanProduct>>(`/loans/${id}`, data);
    return res.data;
  },

  deleteLoan: async (id: string): Promise<ApiResponse<any>> => {
    const res = await api.delete(`/loans/${id}`);
    return res.data;
  }
};
