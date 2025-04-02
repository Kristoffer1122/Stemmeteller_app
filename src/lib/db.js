// lib/db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
	queueLimit: 0,
});

// Promisified Query Function
export const query = (sql, values) => {
	return new Promise((resolve, reject) => {
		pool.query(sql, values, (err, results) => {
			if (err) {
				console.error('Database Error:', err); // Log the error
				return reject(err);
			}
			resolve(results);
		});
	});
};
