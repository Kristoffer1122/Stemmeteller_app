"/api/auth.js"
import { query } from '../../lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { userName, userPassword } = req.body;

		try {
			// Insert data into the partioversikt table
			const result = await query(
				'INSERT INTO userinfo (user_name, user_password) VALUES (?, ?)',
				[userName, userPassword]
			);
			res.status(200).json({ message: 'Data inserted successfully', result });
		} catch (error) {
			res.status(500).json({ message: 'Database error', error: error.message });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
