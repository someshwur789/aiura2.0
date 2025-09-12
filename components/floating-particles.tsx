"use client"

import { useEffect, useRef } from "react"

export function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "absolute w-1 h-1 bg-primary rounded-full opacity-60"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = "100%"
      particle.style.animation = `matrix-rain ${3 + Math.random() * 4}s linear infinite`

      container.appendChild(particle)

      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      }, 7000)
    }

    const interval = setInterval(createParticle, 200)

    return () => clearInterval(interval)
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10" />
}
