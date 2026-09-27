"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveCustomerSession } from "../utils/session";

export default function FarasGamePage() {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "FARAS_DONE") {
        saveCustomerSession({ prize3: event.data.prize });
        router.push("/?celebrate=grand");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      <div className="absolute top-3 right-3 sm:top-4 sm:right-6 z-40 flex items-center gap-2 pointer-events-none">
        <div className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-black text-xs sm:text-sm tracking-wide border-2 border-white shadow-[0_8px_24px_rgba(234,88,12,0.45)] ring-2 ring-amber-400/80 flex items-center gap-2 backdrop-blur-sm">
          <span>Round 3</span>
        </div>
      </div>
      <iframe
        src="/faras.html"
        className="w-full h-full border-none outline-none"
        title="Dashain Tihar Faras Game"
      />
    </div>
  );
}
