import { pool, query, verifyConnection } from '../config/database';
import { logger } from '../utils/logger';

export const verifyDatabase = async (): Promise<boolean> => {
  logger.info('[DB Verification] Starting InsForge database verification...');

  // 1. Verify Connection
  const isConnected = await verifyConnection();
  if (!isConnected) {
    logger.error('[DB Verification] ❌ Connection failed.');
    return false;
  }
  logger.info('[DB Verification] ✓ Database connection verified successfully.');

  // 2. Verify Required Tables Exist
  const requiredTables = [
    'users',
    'admin_users',
    'loan_categories',
    'loan_products',
    'industries',
    'leads',
    'lead_notes',
    'lead_status_history',
    'appointments',
    'appointment_slots',
    'reviews',
    'testimonials',
    'faqs',
    'banners',
    'blog_posts',
    'gallery_items',
    'contact_messages',
    'notifications',
    'website_settings',
    'seo_settings'
  ];

  const tablesRes = await query<{ table_name: string }>(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
  );
  const existingTables = new Set(tablesRes.rows.map((r) => r.table_name));

  const missingTables = requiredTables.filter((t) => !existingTables.has(t));
  if (missingTables.length > 0) {
    logger.error(`[DB Verification] ❌ Missing required tables: ${missingTables.join(', ')}`);
    return false;
  }
  logger.info(`[DB Verification] ✓ All ${requiredTables.length} required tables verified in public schema.`);

  // 3. Verify Key Indexes Exist
  const indexesRes = await query<{ indexname: string }>(
    `SELECT indexname FROM pg_indexes WHERE schemaname = 'public'`
  );
  const existingIndexes = new Set(indexesRes.rows.map((r) => r.indexname));

  const requiredIndexes = [
    'idx_leads_email',
    'idx_leads_phone',
    'idx_leads_status',
    'idx_leads_created_at',
    'idx_leads_loan_type',
    'idx_appointments_date',
    'idx_appointments_status'
  ];

  const missingIndexes = requiredIndexes.filter((idx) => !existingIndexes.has(idx));
  if (missingIndexes.length > 0) {
    logger.warn(`[DB Verification] Missing indexes: ${missingIndexes.join(', ')}`);
  } else {
    logger.info(`[DB Verification] ✓ Key indexes verified for email, phone, status, created_at, loan_type, and appointment_date.`);
  }

  // 4. Safe read-only verification query
  const testQuery = await query('SELECT NOW() as current_server_time, current_database() as database_name');
  logger.info(`[DB Verification] ✓ Safe read-only verification query executed. Database: ${testQuery.rows[0].database_name}, Server Time: ${testQuery.rows[0].current_server_time}`);

  return true;
};

if (require.main === module) {
  verifyDatabase()
    .then((success) => {
      pool.end();
      process.exit(success ? 0 : 1);
    })
    .catch((err) => {
      logger.error('[DB Verification] Unexpected error', err);
      pool.end();
      process.exit(1);
    });
}
