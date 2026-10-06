import { Pool, QueryResult, QueryResultRow } from 'pg';
import { config } from './env';

export const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

pool.on('error', (err) => {
  console.error('[DB Error] Unexpected error on idle database client', err);
});

export const query = async <T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> => {
  const start = Date.now();
  const res = await pool.query<T>(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === 'development' && duration > 500) {
    console.warn(`[Slow Query] ${duration}ms: ${text}`);
  }
  return res;
};

export const verifyConnection = async (): Promise<boolean> => {
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
