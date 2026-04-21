import pool from '../db.js';

export class UserModel {
    static async create(name: string, email: string, passwordHash: string) {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [name, email, passwordHash]);
        return result;
    }

    static async findByEmail(email: string) {
        const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
}