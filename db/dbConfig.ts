import { Pool } from "pg";

const dbConfig = {
  user: process.env.SUPABASE_DB_USER!,
  password: process.env.SUPABASE_DB_PASSWORD!,
  host: process.env.SUPABASE_DB_HOST!,
  port: process.env.SUPABASE_DB_PORT!,
  database: process.env.SUPABASE_DB_DATABASE!,
};
export const pool = new Pool(dbConfig);
