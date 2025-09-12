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
        <div className="text-orange-400 text-xl">Loading AI Aura 2.0...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="opacity-30">
        <EnhancedMatrix />
        <FloatingParticles />
        <ScanLines />
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 min-h-screen flex flex-col transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <header className="flex justify-center items-center p-6 md:p-8">
          <div className="flex items-center space-x-4">
            <Image
              src="/saec-logo.png"
              alt="S.A. Engineering College"
              width={100}
              height={100}
              className="rounded-full animate-pulse"
            />
            <div className="text-white">
              <div className="text-sm font-medium">S.A. Engineering College</div>
              <div className="text-xs text-gray-400">Dept. of AI & DS</div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-8">
          <div className="mb-8 animate-fade-in">
            <Image
              src="/aura-logo.png"
              alt="AI Aura 2.0"
              width={300}
              height={520}
              className="mx-auto animate-pulse"
              priority
            />
          </div>

          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-glow-pulse">COMING SOON</h1>
            <p className="text-xl md:text-2xl text-orange-400 font-medium">National Level Technical Symposium</p>
          </div>

          <div className="bg-black/70 backdrop-blur-sm border border-orange-500/50 rounded-lg p-8 max-w-2xl mx-auto animate-slide-up border-glow">
            <h2 className="text-2xl md:text-3xl font-bold text-orange-400 mb-6 animate-glow-pulse">
              Event Launch Details
            </h2>
            <div className="space-y-4 text-lg">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <span className="text-gray-300 font-medium">Event Date:</span>
                <span className="text-white font-bold text-xl animate-glow-pulse">September 26, 2025</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <span className="text-gray-300 font-medium">Website Launch:</span>
                <span className="text-white font-bold text-xl animate-glow-pulse">September 16, 2025</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <span className="text-gray-300 font-medium">Registration:</span>
                <span className="text-orange-400 font-bold text-xl animate-pulse">Opens Soon</span>
              </div>
            </div>
          </div>

          <div className="text-gray-300 text-lg md:text-xl animate-fade-in">
            Exploring the Frontiers of AI & Data Science
          </div>

          <div className="animate-slide-up">
            <div className="text-3xl md:text-4xl font-bold text-orange-400 animate-glow-pulse tracking-wider">
              STAY TUNED
            </div>
            <div className="text-gray-400 text-sm md:text-base mt-2 animate-pulse">More updates coming soon...</div>
          </div>
        </main>

        <footer className="text-center p-6 text-gray-400 text-sm animate-fade-in">
          <div className="mb-2">© 2025 S.A. Engineering College · Department of AI & Data Science</div>
          <div className="text-orange-400 animate-pulse">"We Design Your Tomorrow"</div>
        </footer>
      </div>
    </div>
  )
}
