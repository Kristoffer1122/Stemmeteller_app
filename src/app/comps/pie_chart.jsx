'use client'
import { useEffect, useRef, useState } from "react";

export default function CanvasComponent() {
	/*
		let partifarger = [
			{ name: "Arbeider Partiet", color: "#f00", },
			{ name: "Høyre", color: "#00f", },
			{ name: "Senter Partiet", color: "#0f0", },
			{ name: "Fremskrittspartiet", color: "#f44", },
			{ name: "Sosialistisk Venstreparti", color: "#a00", },
			{ name: "Rødt", color: "#f00", },
			{ name: "Venstre", color: "#066", },
			{ name: "Miljøpartiet De Grønne", color: "#0f0", },
			{ name: "Kristelig Folkeparti", color: "#111", },
			{ name: "Pasientfokus", color: "#cb0", },
		] */


	let randcolor = Math.floor(Math.random() * partifarger.length);
	console.log(randcolor)


	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		// Draw a rectangle
		ctx.fillStyle = partifarger[randcolor].color;
		ctx.beginPath();
		//  X-axis Y-axis Radius ??  
		ctx.arc(300, 300, 270, 0 2 * Math.PI);
		ctx.fill();
		ctx.stroke()
	}, []);

	return (
		<main className="h-dvh w-8/9 bg-[#fff] m-20 flex justify-start items-center">
			<canvas ref={canvasRef} width={600} height={600} className="border border-gray-500" />
			<div className="text-black text-2xl m-20">
				<p> hadgiuwfiwiuh whfuawfoihu hfoawf ohw oahfo jfwoh</p>
				<p> hadgiuwfiwiuh whfuawfoihu hfoawf ohw oahfo jfwoh</p>
			</div>
		</main >
	);
}
