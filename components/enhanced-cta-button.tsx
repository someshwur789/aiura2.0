"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface EnhancedCTAButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export function EnhancedCTAButton({ onClick, children, className = "" }: EnhancedCTAButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y,
    }

    setRipples((prev) => [...prev, newRipple])
    setIsPressed(true)

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)

    setTimeout(() => setIsPressed(false), 100)

    onClick()
  }

  return (
    <Button
      onClick={handleClick}
      className={`
        relative overflow-hidden
        bg-gradient-to-r from-orange-500 to-red-500 
        hover:from-orange-600 hover:to-red-600 
        text-white font-bold px-8 py-3 rounded-lg text-lg 
        transition-all duration-300 
        hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 
        pulse-glow
        border-2 border-orange-400/50
        ${isPressed ? "animate-button-press" : ""}
        ${className}
      `}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}

      {/* Pulsing border glow */}
      <div className="absolute inset-0 rounded-lg border-2 border-orange-400 animate-pulse opacity-60"></div>

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </Button>
  )
}
