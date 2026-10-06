import bcrypt from 'bcryptjs';
import { query, pool } from '../config/database';
import { config, DATABASE_STATUS } from '../config/env';
import { logger } from '../utils/logger';

export const seedAdmin = async () => {
  if (DATABASE_STATUS === 'DATABASE_NOT_CONFIGURED') {
    logger.info('[SeedAdmin] DATABASE_NOT_CONFIGURED. Skipping admin seed.');
    return;
  }

  const email = config.admin.email;
  const password = config.admin.password;

  if (!email || !password) {
    logger.info('[SeedAdmin] ADMIN_EMAIL or ADMIN_PASSWORD not configured in .env. Skipping admin seed.');
    return;
  }

  try {
    const existing = await query('SELECT id, email, role FROM public.admin_users WHERE LOWER(email) = LOWER($1)', [
      email
    ]);

    if (existing.rows.length > 0) {
      logger.info(`[SeedAdmin] Admin user (${email}) already exists. No action needed.`);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await query(
      `INSERT INTO public.admin_users (name, email, password_hash, role, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, 'SUPER_ADMIN', true, NOW(), NOW())`,
      ['Earth Finance Super Admin', email, hash]
    );

    logger.info(`[SeedAdmin] Successfully created Super Admin account for: ${email}`);
  } catch (error) {
    logger.error('[SeedAdmin] Failed to seed admin user:', error);
  }
};

if (require.main === module) {
  seedAdmin().then(() => {
    pool?.end();
  });
}
