import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: './src/data/tables/pg/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'postgres',
    ssl: false
  }
});