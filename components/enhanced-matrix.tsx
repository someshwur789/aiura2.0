"use client"

import { useEffect, useRef } from "react"

export function EnhancedMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)
    const sparkles: { x: number; y: number; life: number; maxLife: number }[] = []

    let scanLineY = 0
    let scanDirection = 1

    const animate = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Matrix rain with enhanced effects
      ctx.fillStyle = "#00ff41"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Add sparkle effect randomly
        if (Math.random() < 0.02) {
          sparkles.push({
            x: x + Math.random() * fontSize,
            y: y + Math.random() * fontSize,
            life: 30,
            maxLife: 30,
          })
        }

        // Gradient effect for characters
        const gradient = ctx.createLinearGradient(x, y - fontSize, x, y + fontSize)
        gradient.addColorStop(0, "#00ff41")
        gradient.addColorStop(0.5, "#00cc33")
        gradient.addColorStop(1, "rgba(0, 255, 65, 0.3)")

        ctx.fillStyle = gradient
        ctx.fillText(char, x, y)

        // Reset drop randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      // Draw sparkles
      sparkles.forEach((sparkle, index) => {
        const alpha = sparkle.life / sparkle.maxLife
        ctx.fillStyle = `rgba(255, 165, 0, ${alpha})`
        ctx.beginPath()
        ctx.arc(sparkle.x, sparkle.y, 2 * alpha, 0, Math.PI * 2)
        ctx.fill()

        sparkle.life--
        if (sparkle.life <= 0) {
          sparkles.splice(index, 1)
        }
      })

      // Scanning lines
      scanLineY += scanDirection * 2
      if (scanLineY > canvas.height || scanLineY < 0) {
        scanDirection *= -1
      }

      // Horizontal scan line
      const scanGradient = ctx.createLinearGradient(0, scanLineY - 20, 0, scanLineY + 20)
      scanGradient.addColorStop(0, "rgba(255, 165, 0, 0)")
      scanGradient.addColorStop(0.5, "rgba(255, 165, 0, 0.3)")
      scanGradient.addColorStop(1, "rgba(255, 165, 0, 0)")

      ctx.fillStyle = scanGradient
      ctx.fillRect(0, scanLineY - 20, canvas.width, 40)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-5" style={{ opacity: 0.6 }} />
}
