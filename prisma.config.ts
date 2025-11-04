import 'dotenv/config'
import { defineConfig, env } from 'prisma/config';
import path from "node:path";
export default defineConfig({
  schema: path.join("prisma", "models"),
  migrations: {
    path: 'prisma/migrations',
    seed:`tsx prisma/seed.ts`,
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
 
});

