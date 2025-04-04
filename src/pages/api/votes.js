import { query } from '../../lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { name } = req.body;
		console.log(name)

		if (!name) {
			return res.status(400).json({ message: 'Party name is required' });
		}

		try {
			// sette opp stemmer med en naar POST request
			const result = await query(
				'UPDATE parties SET stemmer = stemmer + 1 WHERE name = ?',
				[name]
			);
			console.log(result)

			if (result.affectedRows > 0) {
				res.status(200).json({ message: 'Stemme Sukksessfiult' });
			} else {
				res.status(404).json({ message: 'Fant ikke partiet ditt' });
			}
		} catch (error) {
			res.status(500).json({ message: 'Database error', error: error.message });
		}
	} else if (req.method === 'GET') {
		try {
			// hente partier og stemmne
			const result = await query('SELECT name, color, stemmer FROM parties');

			if (result.length > 0) {
				res.status(200).json(result);
			} else {
				res.status(404).json({ message: 'No parties found' });
			}
		} catch (error) {
			res.status(500).json({ message: 'Database error', error: error.message });
		}
		res.status(405).json({ message: 'Method not allowed' });
	}
}

