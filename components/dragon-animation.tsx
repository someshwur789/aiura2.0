"use client"

import { useEffect, useRef } from "react"

export function DragonAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Dragon particles system
    const dragons: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      angle: number
      rotationSpeed: number
    }> = []

    // Create dragon symbols
    for (let i = 0; i < 3; i++) {
      dragons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 40 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.4,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }

    function drawDragon(x: number, y: number, size: number, angle: number, opacity: number) {
      if (!ctx) return

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.globalAlpha = opacity

      // Dragon symbol using geometric shapes
      ctx.strokeStyle = "#f97316"
      ctx.fillStyle = "rgba(249, 115, 22, 0.2)"
      ctx.lineWidth = 2

      // Dragon head (triangle)
      ctx.beginPath()
      ctx.moveTo(-size / 2, -size / 3)
      ctx.lineTo(size / 2, 0)
      ctx.lineTo(-size / 2, size / 3)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Dragon body (elongated oval)
      ctx.beginPath()
      ctx.ellipse(-size / 2, 0, size / 3, size / 6, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Dragon wings (curved lines)
      ctx.beginPath()
      ctx.moveTo(-size / 4, -size / 4)
      ctx.quadraticCurveTo(-size / 2, -size / 2, -size / 3, -size / 6)
      ctx.moveTo(-size / 4, size / 4)
      ctx.quadraticCurveTo(-size / 2, size / 2, -size / 3, size / 6)
      ctx.stroke()

      // Dragon tail (wavy line)
      ctx.beginPath()
      ctx.moveTo(-size / 2, 0)
      ctx.quadraticCurveTo(-size, -size / 4, -size * 1.2, 0)
      ctx.quadraticCurveTo(-size, size / 4, -size / 2, 0)
      ctx.stroke()

      ctx.restore()
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      dragons.forEach((dragon) => {
        // Update position
        dragon.x += dragon.vx
        dragon.y += dragon.vy
        dragon.angle += dragon.rotationSpeed

        // Bounce off edges
        if (dragon.x < 0 || dragon.x > canvas.width) dragon.vx *= -1
        if (dragon.y < 0 || dragon.y > canvas.height) dragon.vy *= -1

        // Keep dragons in bounds
        dragon.x = Math.max(0, Math.min(canvas.width, dragon.x))
        dragon.y = Math.max(0, Math.min(canvas.height, dragon.y))

        // Pulse opacity
        dragon.opacity = 0.3 + Math.sin(Date.now() * 0.001 + dragon.x * 0.01) * 0.2

        drawDragon(dragon.x, dragon.y, dragon.size, dragon.angle, dragon.opacity)
      })

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
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-5" style={{ mixBlendMode: "screen" }} />
  )
}
