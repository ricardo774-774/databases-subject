import { 
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
} from "../config.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

import { pool } from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createDatabase = async (req, res) => {
    try {
        // Ejecutar la consulta para crear la base de datos si no existe
        await pool.query(`CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}`);
        console.log(`Base de datos '${DB_DATABASE}' creada o ya existía.`);

        await createTableEmployee();

        return res.status(201).json({
            status: 'Success',
            message: 'Database and Table Created Successfully'
        });

    } catch (error) {
        console.error("Error al crear la base de datos:", error);
        return res.status(400).json({
            status: 'Error',
            message: 'Error al crear la base de datos y/o tabla'
        });

    } 
}

export const deleteDatabase = async (req, res) => {
    try {
        await pool.query(`DROP DATABASE IF EXISTS ${DB_DATABASE}`);
        console.log(`Base de datos '${DB_DATABASE}' eliminada o no existía.`);

        return res.status(200).json({
            status: 'Success',
            message: 'Database Deleted Successfully'
        });
    } catch (error) {
        console.error("Error al eliminar la base de datos:", error);
        return res.status(400).json({
            status: 'Error',
            message: 'Error al eliminar la base de datos'
        });

    } 
}

export const initBackup = async (req, res) => {
    try {
        const backupFileName = `${DB_DATABASE}_backup.sql`;
        const backupFilePath = path.join(__dirname, 'backups', backupFileName);

        // Verificar si el directorio de backups existe, si no, crear uno
        if (!fs.existsSync(path.join(__dirname, 'backups'))) {
            fs.mkdirSync(path.join(__dirname, 'backups'));
        }

        // Generar el comando mysqldump sin redirigir la salida a un archivo
        const dumpCommand = `mysqldump -u ${DB_USER} -p${DB_PASSWORD} ${DB_DATABASE}`;

        // Ejecutar el comando mysqldump y capturar la salida
        exec(dumpCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al generar el backup: ${error.message}`);
                return res.status(400).json({
                    status: 'Error',
                    message: 'Error al generar el backup'
                });
            }

            if (stderr) {
                console.error(`Error: ${stderr}`);
            }

            // Escribir el resultado del comando (stdout) en el archivo de backup
            fs.writeFile(backupFilePath, stdout, (err) => {
                if (err) {
                    console.error(`Error al escribir el archivo de backup: ${err.message}`);
                    return res.status(400).json({
                        status: 'Error',
                        message: 'Error al escribir el archivo de backup'
                    });
                }

                console.log(`Backup de la base de datos '${DB_DATABASE}' creado en: ${backupFilePath}`);
                return res.status(200).json({
                    status: 'Success',
                    message: 'Database backup created successfully',
                    backupPath: backupFilePath
                });
            });
        });
    } catch (error) {
        console.error("Error al generar el backup:", error);
        return res.status(400).json({
            status: 'Error',
            message: 'Error al generar el backup'
        });
    }
};

const createTableEmployee = async () => {
    try {

        await pool.query(`USE ${DB_DATABASE}`);

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS employee (
                id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                name VARCHAR(255) DEFAULT NULL,
                salary INT DEFAULT NULL
            )
        `;
        
        await pool.query(createTableQuery);
        console.log('Tabla employee creada o ya existía.');
    } catch (error) {
        console.error("Error al crear la tabla employee:", error);
    }
}
