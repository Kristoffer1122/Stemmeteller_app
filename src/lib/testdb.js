
// test-db-connection.js
const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'krkja001',
	password: '0009',
	database: 'stemmer',
});

pool.query('SELECT 1 + 1 AS solution', (err, results) => {
	if (err) {
		console.error('Database connection error:', err.message);
	} else {
		console.log('Database connection successful:', results);
	}
});
