import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Operation successful',
  statusCode: number = 200
): Response => {
  const payload: ApiResponse<T> = {
    success: true,
    message,
    data
  };
  return res.status(statusCode).json(payload);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  pagination: { page: number; limit: number; total: number },
  message: string = 'Data retrieved successfully'
): Response => {
  const totalPages = Math.ceil(pagination.total / pagination.limit) || 1;
  const payload: ApiResponse<T[]> = {
    success: true,
    message,
    data,
    pagination: {
      ...pagination,
      totalPages
    }
  };
  return res.status(200).json(payload);
};

export const sendError = (
  res: Response,
  error: string = 'An error occurred',
  statusCode: number = 500,
  details?: any
): Response => {
  const payload: ApiResponse = {
    success: false,
    error,
    ...(details && { data: details })
  };
  return res.status(statusCode).json(payload);
};
