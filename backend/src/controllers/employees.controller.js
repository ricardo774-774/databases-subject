import { DB_DATABASE } from "../config.js";
import { pool } from "../db.js";
import { 
    notFound, 
    notRemoved,
    notUpdated,
} from "../validations/employees.validation.js";

const dbInaccessible =  'Something goes wrong';

export const getEmployees = async (req, res) => {
    try {
        await pool.query('USE restApi');
        const [rows] = await pool.query('SELECT * FROM employee');
        return res.json(rows);
    } catch (err) {
        console.error('Error accessing the database:', err);
        return res.status(500).json({
            message: 'Database is inaccessible. Please try again later.'
        });
    }
};

export const getEmployee = async (req, res) => {
    try {
        await pool.query('USE restApi');
        const {id} = req.params;
        const [rows] = await pool.query(
            `SELECT * FROM employee WHERE id = ?`, 
            [id]
        );
        notFound(res, rows);
        res.send(rows[0]);
    } catch (err) {
        return res.status(500).json({
            message: dbInaccessible
        });
    }
}

export const createEmployees = async (req, res) => {
    try {
        await pool.query('USE restApi');
        const {name, salary} = req.body;
        const [rows] = await pool.query(
            `INSERT INTO employee (name, salary) VALUES (?, ?)`,
            [name, salary]
        );
        res.send({
            id: rows.insertId,
            name,
            salary, 
        });
    } catch (err) {
        return res.status(500).json({
            message: dbInaccessible
        });
    }
}

export const updateEmployees = async(req, res) => {
    try {
        await pool.query('USE restApi');
        const {id} = req.params;
        const {name, salary} = req.body;
        const [result] = await pool.query(
            `UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary)
            WHERE id = (?)`,
            [name, salary, id]
        );
        notUpdated(res, result);
    } catch (err) {
        return res.status(500).json({
            message: dbInaccessible
        });
    }
}

export const deleteEmployees = async (req, res) => {
    try {
        await pool.query('USE restApi');
        const {id} = req.params;
        const [result] = await pool.query(
            `DELETE FROM employee WHERE id = ?`,
            [id]
        );
        notRemoved(res, result);
    } catch (error) {
        return res.status(500).json({
            message: dbInaccessible
        });
    }
}