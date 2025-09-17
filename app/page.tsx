"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { EnhancedMatrix } from "@/components/enhanced-matrix"
import { FloatingParticles } from "@/components/floating-particles"
import { ScanLines } from "@/components/scan-lines"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeout(() => setShowContent(true), 500)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-orange-400 text-xl font-semibold animate-pulse">
          Loading AI Aura 2.0...
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="opacity-30">
        <EnhancedMatrix />
        <FloatingParticles />
        <ScanLines />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 min-h-screen flex flex-col transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* College & Department */}
        <header className="flex flex-col items-center text-center px-6 pt-10">
          <Image
            src="/saec-logo.png"
            alt="S.A. Engineering College"
            width={80}
            height={80}
            className="rounded-full mb-4 animate-pulse"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold text-orange-400 drop-shadow-md">
            S.A. ENGINEERING COLLEGE
          </h1>
        </header>
<br></br>
<br></br>
        {/* Event Title */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-10">
          <div className="animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              National Level Technical Symposium
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mt-2">
            Department of Artificial Intelligence and Data Science
          </p>
          <p className="text-sm md:text-base text-gray-100 italic mt-1">
            ORGANIZES
          </p>
          </div>

          {/* AI Aura Logo (Responsive & Centered) */}
          <div className="animate-fade-in flex justify-center items-center w-full">
            <Image
              src="/AIURA.png"
              alt="AI Aura 2.0"
              width={0}
              height={0}
              sizes="100vw"
              className="mx-auto animate-pulse drop-shadow-lg w-100 md:w-[50rem] h-auto object-contain"
              priority
            /> 
          </div>

          {/* Event Details */}
          <div className="bg-black/70 backdrop-blur-sm border border-orange-500/50 rounded-lg p-8 max-w-2xl mx-auto animate-slide-up border-glow">
            <h3 className="text-2xl md:text-3xl font-bold text-orange-400 mb-6 animate-glow-pulse">
              Event Details
            </h3>
            <div className="space-y-4 text-lg">
              <DetailRow label="Event Date:" value="September 26, 2025" highlight />
              <DetailRow label="Website Launch:" value="September 18, 2025" highlight />
              <DetailRow label="Registration:" value="Opens Soon" pulse />
            </div>
          </div>

          {/* Stay Tuned */}
          <div className="animate-slide-up">
            <div className="text-3xl md:text-4xl font-bold text-orange-400 animate-glow-pulse tracking-wider">
              STAY TUNED
            </div>
            <div className="text-gray-400 text-sm md:text-base mt-2 animate-pulse">
              More updates coming soon...
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center p-6 text-gray-400 text-sm animate-fade-in">
          <div className="text-orange-400 animate-pulse font-semibold text-lg">
            "We Design Your Tomorrow"
          </div>
        </footer>
      </div>
    </div>
  )
}

/* Reusable Row Component */
function DetailRow({
  label,
  value,
  highlight,
  pulse,
}: {
  label: string
  value: string
  highlight?: boolean
  pulse?: boolean
}) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
      <span className="text-gray-300 font-medium">{label}</span>
      <span
        className={`text-xl font-bold ${
          highlight
            ? "text-white animate-glow-pulse"
            : pulse
            ? "text-orange-400 animate-pulse"
            : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  )
}
