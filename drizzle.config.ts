import 'dotenv/config';
import type {Config} from 'drizzle-kit';

export default {
    schema: 'database/models',
    out: 'drizzle',
    driver: 'mysql2',
    dbCredentials: {
      host: String(process.env.DB_HOST),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: String(process.env.DB_NAME),
    },
  } satisfies Config;