"use client"

import { useEffect, useState } from "react"

interface SystemBootProps {
  onComplete: () => void
}

export function SystemBoot({ onComplete }: SystemBootProps) {
  const [bootStage, setBootStage] = useState(0)
  const [bootText, setBootText] = useState("")

  const bootSequence = [
    "INITIALIZING AI AURA 2.0 SYSTEMS...",
    "LOADING NEURAL NETWORKS...",
    "CONNECTING TO SAEC DATABASE...",
    "ACTIVATING DRONE SWARM...",
    "CALIBRATING HOLOGRAPHIC DISPLAY...",
    "SYSTEM READY - WELCOME TO THE FUTURE",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      if (bootStage < bootSequence.length) {
        setBootText(bootSequence[bootStage])
        setBootStage((prev) => prev + 1)
      } else {
        clearInterval(timer)
        setTimeout(onComplete, 1000)
      }
    }, 800)

    return () => clearInterval(timer)
  }, [bootStage, onComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Scanning lines */}
        <div className="relative mb-8">
          <div className="w-96 h-1 bg-orange-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent w-20 animate-scan"></div>
          </div>
        </div>

        {/* Boot text */}
        <div className="text-orange-400 font-mono text-lg mb-4 h-8">{bootText}</div>

        {/* Progress indicators */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < bootStage ? "bg-orange-500" : "bg-orange-500/20"
              }`}
            />
          ))}
        </div>

        {/* AURA logo during boot */}
        <div className="mt-8 text-4xl font-bold text-white opacity-50">AURA 2.0</div>
      </div>
    </div>
  )
}
