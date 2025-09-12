"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function AnimatedLogo() {
  const [glowIntensity, setGlowIntensity] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity((prev) => (prev + 1) % 100)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const glowStyle = {
    filter: `drop-shadow(0 0 ${10 + Math.sin(glowIntensity * 0.1) * 20}px #f97316) brightness(${1 + Math.sin(glowIntensity * 0.1) * 0.3})`,
    transform: `scale(${1 + Math.sin(glowIntensity * 0.05) * 0.05}) rotate(${Math.sin(glowIntensity * 0.02) * 2}deg)`,
  }

  return (
    <div className="relative mb-8">
      {/* Animated background rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 border border-orange-500/20 rounded-full animate-spin-slow"></div>
        <div className="absolute w-80 h-80 border border-orange-400/30 rounded-full animate-spin-reverse"></div>
        <div className="absolute w-64 h-64 border border-orange-300/40 rounded-full animate-pulse"></div>
      </div>

      {/* Main logo with animations */}
      <div className="relative z-10 transition-all duration-300" style={glowStyle}>
        <Image src="/aura-logo.png" alt="AI Aura 2.0" width={400} height={200} className="max-w-full h-auto" priority />
      </div>

      {/* Floating energy orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin(i) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
