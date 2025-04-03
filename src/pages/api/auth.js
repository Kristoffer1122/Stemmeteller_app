'use client'
"/api/auth.js"
import { query } from '../../lib/db';

export default async function handler(req, res) {
	// POST metoden 
	if (req.method === 'POST') {
		const { user_name, user_password } = req.body;
		console.log('Received data:', { user_name, user_password });

		// sier seg selv
		if (!user_name || !user_password) {
			return res.status(400).json({ message: 'User name or password is missing' });
		}
		// her skjer magien, skjekk databasen om KUN username finnes.
		const simmilar = await query(
			'SELECT user_name FROM userinfo WHERE user_name = $1',
			[user_name]
		);

		try {
			// hvis username ikke er likt fortsett som vanelig
			if (!simmilar) {
				// Insert data into the userinfo table
				const result = await query(
					'INSERT INTO userinfo (`user_name`, `user_password`) VALUES (?, ?)',
					[user_name, user_password]
				)
				res.status(200).json({ message: 'Data inserted successfully', result });
			} else { // ellers hvis brukernavnet er i bruk send error og ikke insert i db
				res.status(400).json({ message: 'Username In Use' })
			}
		}
		catch (error) {
			res.status(500).json({ message: 'Database error', error: error.message });
		}
	}

	else if (req.method === 'GET') {
		const { user_name } = req.query; // Naar GET metoden, henter vi ut user_name fra queryen, vet ikke hva det er men det fungerer. 

		if (!user_name) {
			return res.status(400).json({ message: 'User name is required' });
		}

		try {
			// leter KUN etter user_name ikke user_password for sikkerhets grunner.
			const result = await query(
				'SELECT user_name FROM userinfo WHERE user_name = ?',
				[user_name]
			);

			// hvis det vi faar er mer enn 0, har vi en match i db.
			if (result.length > 0) {
				res.status(200).json({ exists: true, message: 'Username exists', data: result });
			} else {
				res.status(404).json({ exists: false, message: 'Username not found, Please Register' });
			}
		} catch (error) {
			res.status(500).json({ message: 'Database error', error: error.message });
		}
	}

	else {
		res.status(405).json({ message: 'Method not allowed' });
	}
};
