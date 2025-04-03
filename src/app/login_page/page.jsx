'use client'

import { useEffect, useState } from "react";
import Erikstad_Header from "../comps/header";
import Login_Page from "../comps/login";
import Registrer from "../comps/register";

export default function Home() {
  const [loggedInn, setLoggedInn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("loggedInn");
    const parsedStatus = storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
    setLoggedInn(parsedStatus);
  }, []);

  return (
    <main className="h-dvh w-dvw flex flex-col items-center bg-[#222] overflow-hidden">
      <Erikstad_Header />
      {loggedInn ? <Registrer /> : <Login_Page />}
    </main>
  );
}
