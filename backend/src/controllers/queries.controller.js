import { pool } from "../db.js";

const dbInaccessible =  'Something goes wrong';

//////////////////////// Basic Queries ////////////////////////

export const basic = async (req, res) => {
    try {
        let result;
        await pool.query('USE restApi');
        switch (req.params.id) {
            case '1': 
                [result] = await pool.query(
                    "SELECT * FROM clients;"
                );
                break;
            case '2': 
                [result] = await pool.query(
                    "SELECT name, email FROM clients;"
                );
                break;
            case '3': 
                [result] = await pool.query(
                    "SELECT * FROM transactions;"
                );
                break;
            case '4': 
                [result] = await pool.query(
                    "SELECT * FROM products;"
                );
                break;
            case '5': 
                [result] = await pool.query(
                    "SELECT name, address FROM clients WHERE address LIKE '%Springfield%';"
                );
                break;
            case '6': 
                [result] = await pool.query(
                    "SELECT * FROM transactions WHERE client_id = 3;"
                );
                break;
            case '7': 
                [result] = await pool.query(
                    "SELECT * FROM products WHERE price > 100;"
                );
                break;
            case '8': 
                [result] = await pool.query(
                    "SELECT name FROM clients WHERE phone_number LIKE '555-1%';"
                );
                break;
            case '9': 
                [result] = await pool.query(
                    "SELECT * FROM transactions WHERE transaction_date > '2024-01-10';"
                );
                break;
            case '10': 
                [result] = await pool.query(
                    "SELECT name, price FROM products;"
                );
                break;
            case '11': 
                [result] = await pool.query(
                    "SELECT * FROM clients WHERE name LIKE '%a%';"
                );
                break;
            case '12': 
                [result] = await pool.query(
                    "SELECT * FROM transactions WHERE amount < 150;"
                );
                break;
            case '13': 
                [result] = await pool.query(
                    "SELECT name, description FROM products WHERE price BETWEEN 50 AND 300;"
                );
                break;
            case '14': 
                [result] = await pool.query(
                    "SELECT address FROM clients ORDER BY address ASC;"
                );
                break;
            case '15': 
                [result] = await pool.query(
                    "SELECT * FROM transactions WHERE description LIKE '%fee%';"
                );
                break;

            default: console.log(`Value ${req.params.id} was not found`);
                break;
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ message: dbInaccessible });
    }
};

//////////////////////// Advaced Queries ////////////////////////

export const advanced = async (req, res) => {
    try {
        let result;
        await pool.query('USE restApi');
        switch (req.params.id) {
            case '1': 
                [result] = await pool.query(
                    "SELECT t.transaction_id, t.amount, t.description, c.name FROM transactions t JOIN clients c ON t.client_id = c.client_id;"
                );
                break;
            case '2': 
                [result] = await pool.query(
                    "SELECT COUNT(*) AS total_products FROM products;"
                );
                break;
            case '3': 
                [result] = await pool.query(
                    "SELECT * FROM clients WHERE client_id NOT IN (SELECT DISTINCT client_id FROM transactions);"
                );
                break;
            case '4': 
                [result] = await pool.query(
                    "SELECT * FROM products ORDER BY price DESC;"
                );
                break;
            case '5': 
                [result] = await pool.query(
                    "SELECT * FROM clients ORDER BY client_id DESC LIMIT 5;"
                );
                break;
            case '6': 
                [result] = await pool.query(
                    "SELECT t.transaction_id, t.amount, c.name FROM transactions t JOIN clients c ON t.client_id = c.client_id WHERE t.amount > 300;"
                );
                break;
            case '7': 
                [result] = await pool.query(
                    "SELECT SUM(price) AS total_price FROM products;"
                );
                break;
            case '8': 
                [result] = await pool.query(
                    "SELECT * FROM clients WHERE email LIKE '%example.com';"
                );
                break;
            case '9': 
                [result] = await pool.query(
                    "SELECT * FROM products WHERE stock > 10;"
                );
                break;
            case '10': 
                [result] = await pool.query(
                    "SELECT client_id, MAX(transaction_date) AS last_transaction FROM transactions GROUP BY client_id;"
                );
                break;
            case '11': 
                [result] = await pool.query(
                    "SELECT c.name, COUNT(t.transaction_id) AS total_transactions FROM Clients c LEFT JOIN Transactions t ON c.client_id = t.client_id GROUP BY c.client_id;"
                );
                break;
            case '12': 
                [result] = await pool.query(
                    "SELECT * FROM transactions WHERE amount < 150;"
                );
                break;
            case '13': 
                [result] = await pool.query(
                    "SELECT name, description FROM products WHERE price BETWEEN 50 AND 300;"
                );
                break;
            case '14': 
                [result] = await pool.query(
                    "SELECT address FROM clients ORDER BY address ASC;"
                );
                break;
            case '15': 
                [result] = await pool.query(
                    "SELECT * FROM transactions WHERE description LIKE '%fee%';"
                );
                break;

            default: console.log(`Value ${req.params.id} was not found`);
                break;
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ message: dbInaccessible });
    }
};

//////////////////////// Aggregation Queries ////////////////////////

export const aggregation = async (req, res) => {
    try {
        let result;
        await pool.query('USE restApi');
        switch (req.params.id) {
            case '1': 
                [result] = await pool.query(
                    "SELECT DISTINCT c.* FROM Clients c JOIN transactions t ON c.client_id = t.client_id WHERE t.description LIKE '%payment%';"
                );
                break;
            case '2': 
                [result] = await pool.query(
                    "SELECT AVG(amount) AS average_amount FROM transactions;"
                );
                break;
            case '3': 
                [result] = await pool.query(
                    "SELECT COUNT(*) AS total_transactions FROM transactions;"
                );
                break;
            case '4': 
                [result] = await pool.query(
                    "SELECT MAX(amount) AS highest_amount FROM transactions;"
                );
                break;
            case '5': 
                [result] = await pool.query(
                    "SELECT MIN(amount) AS lowest_amount FROM Transactions;"
                );
                break;
            case '6': 
                [result] = await pool.query(
                    "SELECT client_id, SUM(amount) AS total_amount FROM Transactions GROUP BY client_id;"
                );
                break;
            case '7': 
                [result] = await pool.query(
                    "SELECT * FROM products WHERE price > 100;"
                );
                break;
            case '8': 
                [result] = await pool.query(
                    "SELECT name FROM clients WHERE phone_number LIKE '555-1%';"
                );
                break;
            case '9': 
                [result] = await pool.query(
                    "SELECT * FROM transactions WHERE transaction_date > '2024-01-10';"
                );
                break;
            case '10': 
                [result] = await pool.query(
                    "SELECT name, price FROM products;"
                );
                break;
            case '11': 
                [result] = await pool.query(
                    "SELECT * FROM clients WHERE name LIKE '%a%';"
                );
                break;
            case '12': 
                [result] = await pool.query(
                    "SELECT * FROM transactions WHERE amount < 150;"
                );
                break;
            case '13': 
                [result] = await pool.query(
                    "SELECT name, description FROM products WHERE price BETWEEN 50 AND 300;"
                );
                break;
            case '14': 
                [result] = await pool.query(
                    "SELECT address FROM clients ORDER BY address ASC;"
                );
                break;
            case '15': 
                [result] = await pool.query(
                    "SELECT MONTH(transaction_date) AS transaction_month, SUM(amount) AS total_amount FROM transactions GROUP BY transaction_month;"
                );
                break;

            default: console.log(`Value ${req.params.id} was not found`);
                break;
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ message: dbInaccessible });
    }
};