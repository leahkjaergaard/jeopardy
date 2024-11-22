"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [teams, setTeams] = useState(2); // Standard antal hold

  return (
    <div className="relative w-full h-[730px] absolute inset-0 flex flex-col items-center justify-center">
      <h1 className="text-white text-4xl mb-6">LEAHS JEOPARDY</h1>
      <div className="flex flex-col items-center space-y-4">
        <label htmlFor="teams" className="text-white text-lg">
          Vælg antal hold:
        </label>
        <select id="teams" className="px-4 py-2 rounded bg-blue-950 text-white" value={teams} onChange={(e) => setTeams(parseInt(e.target.value))}>
          <option value={2}>2 hold</option>
          <option value={3}>3 hold</option>
          <option value={4}>4 hold</option>
          <option value={5}>5 hold</option>
        </select>
        <Link
          href={{
            pathname: "/game",
            query: { teams }, // Sender "teams" som query parameter
          }}
          className="bg-blue-950 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-400"
        >
          Start spillet
        </Link>
      </div>
    </div>
  );
}
