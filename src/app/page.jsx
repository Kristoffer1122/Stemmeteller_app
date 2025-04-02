import Chartjs from "./comps/chartjs.jsx"
import { Erikstad_Header } from "./comps/header.jsx"

export default function Home() {

  return (
    <main className="bg-[#222] flex flex-col justify-start items-center overflow-x-hidden">
      <Erikstad_Header />
      <Chartjs />
    </main>
  )
};
