import { Pool } from "pg"; // pool is a class from pg module is a pool of connections to the database

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_H,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

export default pool;
