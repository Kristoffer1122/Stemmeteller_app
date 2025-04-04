'use client'
// denne er ikke like chat gippyet

// pages/index.js
import { useState } from 'react';

export default function Login_Page() {

	const [userName, setUserName] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [responseMessage, setResponseMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		// her kokkelerte jeg, lagrer KUN username naar jeg skal sjekke om brukeren finnes.
		const userinfo = new URLSearchParams({
			user_name: userName, user_password: userPassword,
		}).toString();

		try {
			// query til apien om db inneholder username
			const res = await fetch(`/api/auth?${userinfo}`, {
				// get metoden
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await res.json();
			if (res.ok) {
				setResponseMessage('Logget Inn');
				localStorage.setItem("loggedInn", true);
			} else {
				setResponseMessage(data.message);
			}
		} catch (error) {
			setResponseMessage(error.message);
		}
	};

	// itilfelle jeg gjoor noe rart
	/*
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form data being sent:", { user_name: userName, user_password: userPassword }); // Log data for debugging

		try {
			const res = await fetch('/api/auth', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user_name: userName, user_password: userPassword }), // Ensure proper keys
			});

			const data = await res.json();
			if (res.ok) {
				setResponseMessage('Data inserted successfully!');
			} else {
				setResponseMessage('Error: ' + data.message);
			}
		} catch (error) {
			setResponseMessage('Error: ' + error.message);
		}
	};
	*/

	// jeg elsker aa kommentere html kode :)))))))))))))))))0
	return (
		<div className='h-1/3 w-2/8 bg-[#fff] text-black text-2xl rounded-2xl flex flex-col items-center'>
			<div className='p-4 flex flex-col justify-center'>Logg Inn</div>
			<form onSubmit={handleSubmit} className='flex flex-col items-center'>
				<div className='flex flex-col items-center'>
					<label htmlFor="user_Name">Navn:</label>
					<input
						className='border p-1 w-1/2'
						type="text"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						required
					/>
				</div>
				<div className='flex flex-col items-center'>
					<label htmlFor="user_Password">Passord:</label>
					<input
						className='border p-1 w-1/2'
						type="text"
						value={userPassword}
						onChange={(e) => setUserPassword(e.target.value)}
						required
					/>

				</div>
				<button className='border-2 border-[#222] w-3/9 p-1 m-5 cursor-pointer' type="submit">Logg Inn</button>
			</form>
			<button onClick={() => { window.location.replace("/register_page/") }}>Register</button>
			{responseMessage && <p>{responseMessage}</p>}
		</div>
	);
}
