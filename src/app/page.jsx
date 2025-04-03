'use client'
import Chartjs from "./comps/chartjs.jsx"
import Erikstad_Header from "./comps/header.jsx"
import Login_Page from "./comps/login.jsx"
import Registrer from "./comps/register.jsx"
import { useState } from "react"

export default function Home() {

  const [loggedIn, useCheckedLoggedIn] = useState("")

  return (
    <main className="bg-[#222] flex flex-col justify-start items-center overflow-x-hidden">
      <Erikstad_Header />
      <Chartjs />
      {
        loggedIn ? <Registrer /> : <Login_Page />

      }
    </main>
  )
};
