import api from './api';
import { ApiResponse, Appointment } from '../types';

export const appointmentApi = {
  createAppointment: async (data: Partial<Appointment>): Promise<ApiResponse<Appointment>> => {
    const res = await api.post<ApiResponse<Appointment>>('/appointments', data);
    return res.data;
  },

  getAppointments: async (params?: { page?: number; limit?: number; status?: string; date?: string }): Promise<ApiResponse<Appointment[]>> => {
    const res = await api.get<ApiResponse<Appointment[]>>('/appointments', { params });
    return res.data;
  },

  getAppointmentById: async (id: string): Promise<ApiResponse<Appointment>> => {
    const res = await api.get<ApiResponse<Appointment>>(`/appointments/${id}`);
    return res.data;
  },

  updateStatus: async (id: string, status: string, notes?: string, meeting_link?: string): Promise<ApiResponse<Appointment>> => {
    const res = await api.patch<ApiResponse<Appointment>>(`/appointments/${id}/status`, { status, notes, meeting_link });
    return res.data;
  },

  reschedule: async (id: string, appointment_date: string, appointment_time: string, notes?: string): Promise<ApiResponse<Appointment>> => {
    const res = await api.patch<ApiResponse<Appointment>>(`/appointments/${id}/reschedule`, {
      appointment_date,
      appointment_time,
      notes
    });
    return res.data;
  },

  assignStaff: async (id: string, assigned_to: string | null): Promise<ApiResponse<any>> => {
    const res = await api.patch(`/appointments/${id}/assign`, { assigned_to });
    return res.data;
  }
};
