"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";

export default function WinnersPage() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("alamtech_winners_history") || "[]");
      // Sort by completedAt descending (newest first)
      history.sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
      setWinners(history);
    } catch (err) {
      console.error("Error loading winners:", err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 flex flex-col font-sans select-none">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-blue-900 flex items-center gap-3 drop-shadow-sm">
          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
          Winners Leaderboard
        </h1>
        <Link 
          href="/" 
          className="px-5 py-2.5 bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 rounded-full flex items-center gap-2 transition-all shadow-sm active:scale-95 font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Game
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-blue-100 overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-blue-950 border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-blue-50 text-blue-800 font-black tracking-wider text-sm sm:text-base border-b border-blue-200">
                <th className="p-4 sm:p-5">Date/Time</th>
                <th className="p-4 sm:p-5">Player Name</th>
                <th className="p-4 sm:p-5">Phone Number</th>
                <th className="p-4 sm:p-5">Round 1 (Cash)</th>
                <th className="p-4 sm:p-5">Round 2 (Product)</th>
                <th className="p-4 sm:p-5">Round 3 (Faras)</th>
              </tr>
            </thead>
            <tbody>
              {winners.length > 0 ? (
                winners.map((winner, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors border-b border-blue-100 last:border-b-0 group">
                    <td className="p-4 sm:p-5 text-sm text-slate-500 font-medium">
                      {winner.completedAt ? new Date(winner.completedAt).toLocaleString() : "N/A"}
                    </td>
                    <td className="p-4 sm:p-5 font-black text-blue-950 text-lg">
                      {winner.name || "N/A"}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 font-bold tracking-wide">
                      {winner.phone || "N/A"}
                    </td>
                    <td className="p-4 sm:p-5">
                      <span className="inline-flex px-3 py-1 bg-blue-100 border border-blue-200 text-blue-700 rounded-lg text-sm font-bold shadow-sm">
                        {winner.prize1?.name || "-"}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5">
                      <span className="inline-flex px-3 py-1 bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-lg text-sm font-bold shadow-sm">
                        {winner.prize2?.name || "-"}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5">
                      <span className="inline-flex px-3 py-1 bg-violet-100 border border-violet-200 text-violet-700 rounded-lg text-sm font-bold shadow-sm">
                        {winner.prize3?.name || "-"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                      <Trophy className="w-12 h-12 opacity-30 text-blue-300" />
                      <p className="text-lg font-semibold text-slate-500">No winners recorded yet.</p>
                      <p className="text-sm text-slate-400">Finish a game round to see winners appear here.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
