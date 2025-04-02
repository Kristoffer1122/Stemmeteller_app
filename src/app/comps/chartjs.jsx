'use client'
import { Chart, Colors } from "chart.js/auto";
import { useEffect, useRef } from "react";


export default function Chartjs() {

	/*
	let partifarger = [
		{ name: "Arbeider Partiet", color: "#f00", stemmer: ap_stemm },
		{ name: "Høyre", color: "#00f", stemmer: h_stemm },
		{ name: "Senter Partiet", color: "#0f0", stemmer: sp_stemm },
		{ name: "Fremskrittspartiet", color: "#f44", stemmer: frp_stemm },
		{ name: "Sosialistisk Venstreparti", color: "#a00", stemmer: sv_stemm },
		{ name: "Rødt", color: "#f00", stemmer: r_stemm },
		{ name: "Venstre", color: "#066", stemmer: v_stemm },
		{ name: "Miljøpartiet De Grønne", color: "#0f0", stemmer: mdg_stemm },
		{ name: "Kristelig Folkeparti, color: "#111", stemmer: krf_stemm },
		{ name: "Pasientfokus", color: "#cb0", stemmer: pf_stemm },
	];
	*/
	let partiinfo = [
		{ name: "Arbeiderpartiet", color: "#f00", },
		{ name: "Høyre", color: "#00f", },
		{ name: "Senter Partiet", color: "#0f0", },
		{ name: "Fremskrittspartiet", color: "#f44", },
		{ name: "Sosialistisk Venstreparti", color: "#a00", },
		{ name: "Rødt", color: "#f00", },
		{ name: "Venstre", color: "#066", },
		{ name: "Miljøpartiet De Grønne", color: "#0f0", },
		{ name: "Kristelig Folkeparti", color: "#111", },
		{ name: "Pasientfokus", color: "#cb0", },
	]

	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['Arbeiderpartiet', 'Høyre', 'Senter Partiet', 'Fremskrittspartiet', 'Sosialistisk Venstreparti', 'Rødt', 'Venstre', 'Miljøpartiet De Grønne', 'Kristelig Folkeparti', 'Pasientfokus'],
				datasets: [{
					label: '# av stemmer',
					data: [12, 19, 3, 4, 5, 15, 16, 16, 11, 8],
					borderWidth: 2,
					backgroundColor: [
						partiinfo[0].color,
						partiinfo[1].color,
						partiinfo[2].color,
						partiinfo[3].color,
						partiinfo[4].color,
						partiinfo[5].color,
						partiinfo[6].color,
						partiinfo[7].color,
						partiinfo[8].color,
						partiinfo[9].color,
					]
				},
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					}
				}
			}
		});
	}, []);
	return (
		<main className="h-dvh w-8/9 bg-[#fff] flex flex-col items-center justify-center rounded-2xl">
			<section className="h-7/9 w-8/9 bg-[#222] flex flex-row justify-start items-center">
				<div className="h-120 w-120 m-5  rounded-2xl bg-white ">
					<canvas ref={canvasRef} width={1} height={1} className="w-1 h-1" />
				</div>
				<div className="flex flex-col text-2xl">
					<p className="text-white"> {partiinfo[0].name} </p>
					<p className="text-white"> {partiinfo[1].name} </p>
					<p className="text-white"> {partiinfo[2].name} </p>
					<p className="text-white"> {partiinfo[3].name} </p>
					<p className="text-white"> {partiinfo[4].name} </p>
					<p className="text-white"> {partiinfo[5].name} </p>
					<p className="text-white"> {partiinfo[6].name} </p>
					<p className="text-white"> {partiinfo[7].name} </p>
					<p className="text-white"> {partiinfo[8].name} </p>
					<p className="text-white"> {partiinfo[9].name} </p>
				</div>
			</section>
		</main>
	);
}
