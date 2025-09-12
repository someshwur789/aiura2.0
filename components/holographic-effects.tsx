"use client"

import { useEffect, useRef } from "react"

export function HolographicEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Holographic grid lines
    const gridLines: Array<{
      x1: number
      y1: number
      x2: number
      y2: number
      opacity: number
      speed: number
    }> = []

    // Create grid pattern
    for (let i = 0; i < 20; i++) {
      gridLines.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        opacity: Math.random() * 0.3,
        speed: Math.random() * 0.5 + 0.1,
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw holographic grid
      gridLines.forEach((line) => {
        ctx.strokeStyle = `rgba(249, 115, 22, ${line.opacity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.stroke()

        // Animate opacity
        line.opacity = Math.abs(Math.sin(Date.now() * 0.001 * line.speed)) * 0.3
      })

      // Draw scanning beam
      const scanY = (Date.now() * 0.1) % canvas.height
      const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50)
      gradient.addColorStop(0, "rgba(249, 115, 22, 0)")
      gradient.addColorStop(0.5, "rgba(249, 115, 22, 0.3)")
      gradient.addColorStop(1, "rgba(249, 115, 22, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, scanY - 50, canvas.width, 100)

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-1" style={{ mixBlendMode: "overlay" }} />
  )
}
