'use client'
import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

export default function Chartjs() {
	const [chartData, setChartData] = useState([]);
	const canvasRef = useRef(null);

	// Function to fetch data and update the chart
	const handleVotes = async () => {
		try {
			const res = await fetch('/api/votes', {
				method: 'GET', // Assuming the data is fetched via GET method
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await res.json();

			if (res.ok && data) {
				console.log('Received data:', data);
				setChartData(data);
			}
		} catch (error) {
			console.error('Error fetching vote data:', error);
		}
	};

	// Sette opp stemmene
	const incrementVote = async (partyName) => {
		if (localStorage.getItem("loggedInn") === "true") {
			try {
				const res = await fetch('/api/votes', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ name: partyName }),
				});
				console.log(res)

				const data = await res.json();

				if (res.ok) {
					console.log('Vote incremented for:', partyName);
					handleVotes();
				} else {
					console.error('Failed to increment vote');
				}
			} catch (error) {
				console.error('Error incrementing vote:', error);
			}
		} else {
			alert("You must be logged in to vote!");
		}
	};

	// chart.js
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		if (chartData.length > 0) {
			// Preparing the data for the chart
			const labels = chartData.map(party => party.name);
			const data = chartData.map(party => party.stemmer);
			const colors = chartData.map(party => party.color);

			const chart = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: labels,
					datasets: [{
						label: '# of Votes',
						data: data,
						borderWidth: 2,
						backgroundColor: colors,
					}],
				},
			});

			return () => chart.destroy()
		}
	}, [chartData]);

	// Fetch data when the component is mounted
	useEffect(() => {
		handleVotes();
	}, []);

	return (
		<div className="h-dvh w-dvw overflow-hidden flex flex-col items-center">
			<main className="h-220 w-10/12 bg-[#fff] flex justify-evenly">
				<section className="h-200 w-200">
					<canvas ref={canvasRef}></canvas>
				</section>
				<div className="flex flex-col">
					{chartData.map((party, index) => (
						<button
							className="w-50 "
							key={index}
							onClick={() => incrementVote(party.name)}
							style={{ backgroundColor: party.color, margin: '5px', padding: '10px' }}
						>
							<div className=" flex flex-col text-center">
								<p> Stemm For {party.name} </p>
							</div>
						</button>
					))}
				</div>
			</main>
		</div>
	);
}
