import { Pool, QueryResult, QueryResultRow } from 'pg';
import { config, DATABASE_STATUS } from './env';

const isConfigured = Boolean(config.databaseUrl && config.databaseUrl.trim() !== '');

export const pool: Pool | null = isConfigured
  ? new Pool({
      connectionString: config.databaseUrl,
      ssl: {
        rejectUnauthorized: false
      },
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000
    })
  : null;

if (pool) {
  pool.on('error', (err) => {
    console.error('[DB Error] Unexpected error on idle database client', err);
  });
}

export const getDatabaseState = () => DATABASE_STATUS;

export const query = async <T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> => {
  if (!pool) {
    const err = new Error('DATABASE_NOT_CONFIGURED: Earth Finance is not connected to any database.');
    (err as any).code = 'DATABASE_NOT_CONFIGURED';
    throw err;
  }
  const start = Date.now();
  const res = await pool.query<T>(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === 'development' && duration > 500) {
    console.warn(`[Slow Query] ${duration}ms: ${text}`);
  }
  return res;
};

export const verifyConnection = async (): Promise<boolean> => {
  if (!pool) {
    return false;
  }
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT 1 as connected');
    client.release();
    return result.rows[0].connected === 1;
  } catch (error) {
    console.error('[DB Connection Error]', error);
    return false;
  }
};
