import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

type ExecuteQueryParams = {
  query: string;
  values?: (string | number | boolean | null)[];
};

// Make it generic <T> so TS knows what type results are
export default async function executeQuery<T>({
  query,
  values = [],
}: ExecuteQueryParams): Promise<T> {
  try {
    const [results] = await pool.execute(query, values);
    return results as T;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
