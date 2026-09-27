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
    <div className="min-h-screen bg-slate-950 p-4 sm:p-8 flex flex-col font-sans select-none">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 flex items-center gap-3 drop-shadow-lg">
          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
          Winners Leaderboard
        </h1>
        <Link 
          href="/" 
          className="px-5 py-2.5 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 text-white rounded-full flex items-center gap-2 transition-all shadow-lg active:scale-95 font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Game
        </Link>
      </div>

      <div className="bg-gradient-to-b from-[#1c122e] to-[#0c0617] rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-black/40 text-amber-400 font-black tracking-wider text-sm sm:text-base border-b border-amber-500/30">
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
                  <tr key={idx} className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0 group">
                    <td className="p-4 sm:p-5 text-sm text-slate-400 font-medium">
                      {winner.completedAt ? new Date(winner.completedAt).toLocaleString() : "N/A"}
                    </td>
                    <td className="p-4 sm:p-5 font-black text-amber-100 text-lg">
                      {winner.name || "N/A"}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-300 font-bold tracking-wide">
                      {winner.phone || "N/A"}
                    </td>
                    <td className="p-4 sm:p-5">
                      <span className="inline-flex px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-lg text-sm font-bold">
                        {winner.prize1?.name || "-"}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5">
                      <span className="inline-flex px-3 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-300 rounded-lg text-sm font-bold">
                        {winner.prize2?.name || "-"}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5">
                      <span className="inline-flex px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-bold">
                        {winner.prize3?.name || "-"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                      <Trophy className="w-12 h-12 opacity-20" />
                      <p className="text-lg font-semibold">No winners recorded yet.</p>
                      <p className="text-sm">Finish a game round to see winners appear here.</p>
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
