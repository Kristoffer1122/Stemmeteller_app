'use client'

// beklager saa mye, dette er saa sykt chat gippity'a

import { useState } from "react";
export default function Registrer() {
	const [userName, setUserName] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [responseMessage, setResponseMessage] = useState('');


	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log("test")
			const res = await fetch(`/api/auth`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user_name: userName, user_password: userPassword }),
			});

			const data = await res.json();
			if (res.ok) {
				setResponseMessage('Registered');
			} else {
				setResponseMessage(data.message);
			}
		} catch (error) {
			setResponseMessage(error.message);
		}
	};

	return (
		<div className='h-1/3 w-2/8 bg-[#fff] text-black text-2xl rounded-2xl flex flex-col items-center'>
			<div className='p-4 flex flex-col justify-center'>Registrer Bruker</div>
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
				<button className='border-2 border-[#222] w-3/9 p-1 m-5 cursor-pointer' type="submit">Registrer</button>
			</form>
			{responseMessage && <p>{responseMessage}</p>}
		</div>
	)
}
