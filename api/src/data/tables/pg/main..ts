import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Create a PostgreSQL connection pool
const pool = new Pool({
  host: 'localhost', // Your database host
  port: 5432,        // Your database port
  user: 'postgres',  // Your database username
  password: 'postgres', // Your database password
  database: 'spsavos',  // Your database name
});

// Initialize Drizzle with the PostgreSQL connection
const db = drizzle(pool);

export default db;