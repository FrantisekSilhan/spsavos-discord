import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { createDiscordBot } from 'src/discord/discord.utils';

// Create a PostgreSQL connection pool
const pool = new Pool({
  host: 'localhost', // Your database host
  port: 5432,        // Your database port
  user: 'postgres',  // Your database username
  password: 'password', // Your database password
  database: 'postgres',  // Your database name
});

// Initialize Drizzle with the PostgreSQL connection
const db = drizzle(pool);

export default db;