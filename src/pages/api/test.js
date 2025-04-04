
export default async function handler(req, res) {
	try {
		res.status(200).json({ text: "hello-test" });
	}
	catch (err) {
		console.log("ratty")
	}
}
'use client'
"/api/auth.js"
import { query } from '../../lib/db';

export default async function handler(req, res) {
	// POST metoden 
	if (req.method === 'POST') {
		const Username = req.body;
		console.log("test fra serversiden")
		console.log('Received data:', Username.user_name, Username.user_password);

		// sier seg selv
		if (!Username.user_name || !Username.user_password) {
			return res.status(400).json({ message: 'User name or password is missing' });
		}

		// her skjer magien, skjekk databasen om KUN username finnes.
		// her faar vi ut et array med objekt [ {user_name: userName } ];
		const simmilar = await query(
			'SELECT user_name FROM userinfo WHERE user_name = ?',
			[Username.user_name]
		);

		console.log("banos", simmilar, "Username ", Username)
		console.log(simmilar)

		try {
			// hvis username ikke er likt fortsett som vanelig
			if (simmilar.length == 0) {
				// Insert data into the userinfo table
				const result = await query(
					'INSERT INTO userinfo (`user_name`, `user_password`) VALUES (?, ?)',
					[Username.user_name, Username.user_password]
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
		console.log(req.query)
		const { user_name, user_password } = req.query; // Naar GET metoden, henter vi ut user_name fra queryen, vet ikke hva det er men det fungerer. 

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

				const right_pass = await query(
					'SELECT user_password FROM userinfo WHERE user_password = ?',
					[user_password]
				)

				// hvis foorste resultat er samme som user_name og foorste passord er samme som user_password logg inn
				if (result[0].user_name == user_name && right_pass[0].user_password == user_password) {
					console.log("Logged in to account " + user_name);
					console.log("with right pass ", right_pass[0].user_password);

					res.status(200).json({ exists: true, message: 'Logged Inn', data: result });
				}
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
