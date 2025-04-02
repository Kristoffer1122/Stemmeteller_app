'use client'
// pages/index.js
import { useState } from 'react';

export default function Login_Page() {
	const [userName, setUserName] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [responseMessage, setResponseMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/loginhandler', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userName: userName, userPassword: userPassword }),
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

	return (
		<div className='h-1/3 w-2/8 bg-[#fff] text-black text-2xl rounded-2xl flex flex-col items-center'>
			<div className='p-4'>Logg Inn</div>
			<form onSubmit={handleSubmit}>
				<div className='flex flex-col'>
					<label htmlFor="user_Name">Navn:</label>
					<input
						className='border p-1'
						type="text"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						required
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor="user_Password">Passord:</label>
					<input
						className='border p-1'
						type="text"
						value={userPassword}
						onChange={(e) => setUserPassword(e.target.value)}
						required
					/>

				</div>
			</form>
			<button className='border-2 border-[#222] w-3/9 p-1 m-5 cursor-pointer' type="submit">Logg Inn</button>
			{responseMessage && <p>{responseMessage}</p>}
		</div>
	);
}
