'use client'
import { useEffect, useState } from "react";
import Kommune_Skjold from "../media/Kommune_Skjold.svg"
import Image from "next/image";
export function Erikstad_Header() {

	function go_To_Page(idx) {
		const windows = ["/", "/", "/login_page"]
		if (idx == 0) {
			window.location.replace(windows[0])
		} else if (idx == 1) {
			window.location.replace(windows[1])
		} else if (idx == 2) {
			window.location.replace(windows[2])
		}
	}
	return (
		<div className="bg-[#222] m-0 p-0 h-28 w-dvw overflow-x-hidden flex flex-col justify-center items-center">
			<div className="h-17 self-center w-425 rounded-md m-2 bg-[#f00] c-[#fff] flex flex-row text-4xl justify-evenly items-center">
				<Image src={Kommune_Skjold} alt="Erikstad kommune skjold" width="50" height="1" className="justify-self-start -ml-50" />
				<div onClick={() => go_To_Page(0)} className="h-full w-auto -ml-20 flex items-center hover:cursor-pointer" >
					<a> Erikstad Kommune </a>
				</div>
				<div onClick={() => go_To_Page(1)} className="h-full w-auto -ml-20 flex items-center hover:cursor-pointer">
					<a> Digital Stemming </a>
				</div>
				<div onClick={() => go_To_Page(2)} className="h-full w-auto -ml-20 flex items-center hover:cursor-pointer">
					<a> Logg Inn </a>
				</div>
			</div>
		</div >
	);
}
