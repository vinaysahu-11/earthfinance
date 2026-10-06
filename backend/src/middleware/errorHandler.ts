import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(`[Unhandled Error] ${req.method} ${req.originalUrl}:`, err);

  if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid or expired authentication token', 401);
  }

  if (err.code === '23505') {
    return sendError(res, 'A record with this unique identifier already exists', 409);
  }

  const message = err.message || 'An internal server error occurred';
  const statusCode = err.statusCode || 500;

  return sendError(res, message, statusCode);
};
