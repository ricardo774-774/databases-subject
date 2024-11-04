import { createPool } from "mysql2/promise";
import { 
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
} from "./config.js";

// Crear el pool de conexiones
export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
});
