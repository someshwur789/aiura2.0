"use client"

import { useEffect, useState } from "react"

export function HUDOverlay() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetingActive, setTargetingActive] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setTargetingActive(true)

      // Reset targeting after inactivity
      const timeout = setTimeout(() => setTargetingActive(false), 2000)
      return () => clearTimeout(timeout)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Corner HUD Elements */}
      <div className="absolute top-4 left-4 text-orange-400 text-xs font-mono opacity-60">
        <div className="border border-orange-400/30 p-2 rounded">
          <div>SYS: ONLINE</div>
          <div>AI: ACTIVE</div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            CONN
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 text-orange-400 text-xs font-mono opacity-60">
        <div className="border border-orange-400/30 p-2 rounded">
          <div>AURA 2.0</div>
          <div>v2.0.1</div>
          <div>BETA</div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-orange-400 text-xs font-mono opacity-60">
        <div className="border border-orange-400/30 p-2 rounded">
          <div>DEPT: AI&DS</div>
          <div>SAEC</div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-orange-400 text-xs font-mono opacity-60">
        <div className="border border-orange-400/30 p-2 rounded flex items-center gap-2">
          <div className="w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
          <div className="w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
          <div className="w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
        </div>
      </div>

      {/* Targeting Reticle */}
      {targetingActive && (
        <div
          className="absolute transition-all duration-200 ease-out"
          style={{
            left: mousePos.x - 25,
            top: mousePos.y - 25,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative w-12 h-12">
            {/* Outer ring */}
            <div className="absolute inset-0 border-2 border-orange-400/60 rounded-full animate-spin-slow"></div>

            {/* Inner crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-0.5 bg-orange-400/80"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rotate-90">
              <div className="w-6 h-0.5 bg-orange-400/80"></div>
            </div>

            {/* Corner brackets */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-orange-400"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-orange-400"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-orange-400"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-orange-400"></div>
          </div>
        </div>
      )}

      {/* Floating Icons */}
      <div className="absolute top-1/4 left-8 animate-float">
        <div className="w-4 h-4 border border-orange-400/40 rounded rotate-45"></div>
      </div>

      <div className="absolute top-1/3 right-12 animate-float-delayed">
        <div className="w-3 h-3 bg-orange-400/30 rounded-full animate-pulse"></div>
      </div>

      <div className="absolute bottom-1/3 left-16 animate-float">
        <div className="text-orange-400/40 text-xs">◊</div>
      </div>
    </div>
  )
}
