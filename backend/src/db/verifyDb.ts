import { pool, query, verifyConnection } from '../config/database';
import { DATABASE_STATUS } from '../config/env';
import { logger } from '../utils/logger';

export const verifyDatabase = async (): Promise<boolean> => {
  if (DATABASE_STATUS === 'DATABASE_NOT_CONFIGURED') {
    logger.info('[DB Verification] DATABASE_NOT_CONFIGURED — Earth Finance is not connected to any database.');
    return false;
  }

  logger.info('[DB Verification] Starting database verification...');

  const isConnected = await verifyConnection();
  if (!isConnected) {
    logger.error('[DB Verification] ❌ Connection failed.');
    return false;
  }
  logger.info('[DB Verification] ✓ Database connection verified successfully.');

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

  return true;
};

if (require.main === module) {
  verifyDatabase()
    .then((success) => {
      pool?.end();
      process.exit(success ? 0 : 1);
    })
    .catch((err) => {
      logger.error('[DB Verification] Unexpected error', err);
      pool?.end();
      process.exit(1);
    });
}
