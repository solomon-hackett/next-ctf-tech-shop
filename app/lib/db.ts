import mysql from "mysql2/promise";

declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

const pool =
  global._mysqlPool ??
  mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== "production") {
  global._mysqlPool = pool;
}

type ExecuteQueryParams = {
  query: string;
  values?: (string | number | boolean | null)[];
};

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
