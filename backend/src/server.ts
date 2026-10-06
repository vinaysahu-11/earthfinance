import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import { verifyConnection } from './config/database';
import { apiLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import { seedAdmin } from './db/seedAdmin';
import { logger } from './utils/logger';

const app = express();

// Security headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: [config.frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting to all /api endpoints
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/api/health', async (_req: Request, res: Response) => {
  const dbConnected = await verifyConnection();
  const statusCode = dbConnected ? 200 : 503;

  return res.status(statusCode).json({
    status: dbConnected ? 'UP' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    service: 'Earth Finance API',
    database: {
      provider: 'InsForge PostgreSQL',
      connected: dbConnected
    }
  });
});

// REST API Routes
app.use('/api', routes);

// Centralized error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  const isDbConnected = await verifyConnection();
  if (isDbConnected) {
    logger.info('✓ Connected to InsForge PostgreSQL Database.');
    // Run safe seed check
    await seedAdmin();
  } else {
    logger.error('❌ Could not connect to InsForge PostgreSQL Database on startup.');
  }

  const server = app.listen(config.port, () => {
    logger.info(`🚀 Earth Finance API running on http://localhost:${config.port}`);
    logger.info(`📋 Health check available at http://localhost:${config.port}/api/health`);
  });

  const gracefulShutdown = () => {
    logger.info('Shutting down gracefully...');
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
