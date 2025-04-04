'use client'

import { useEffect, useState } from "react";
import Erikstad_Header from "../comps/header";
import Login_Page from "../comps/login";
import Registrer from "../comps/register";

export default function Home() {

  return (
    <main className="h-dvh w-dvw flex flex-col items-center bg-[#222] overflow-hidden">
      <Erikstad_Header />
      <Registrer />
    </main>
  );
}
