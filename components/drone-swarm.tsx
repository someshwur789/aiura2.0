"use client"

import { useEffect, useRef } from "react"

interface Drone {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  size: number
  glowIntensity: number
  trail: { x: number; y: number; opacity: number }[]
}

export function DroneSwarm() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dronesRef = useRef<Drone[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

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

    // Initialize drones
    const initDrones = () => {
      dronesRef.current = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        angle: Math.random() * Math.PI * 2,
        size: 3 + Math.random() * 2,
        glowIntensity: 0.5 + Math.random() * 0.5,
        trail: [],
      }))
    }

    initDrones()

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      dronesRef.current.forEach((drone) => {
        // Mouse avoidance behavior
        const dx = drone.x - mouseRef.current.x
        const dy = drone.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          drone.vx += (dx / distance) * force * 0.1
          drone.vy += (dy / distance) * force * 0.1
        }

        // Update position
        drone.x += drone.vx
        drone.y += drone.vy
        drone.angle += 0.02

        // Boundary wrapping
        if (drone.x < 0) drone.x = canvas.width
        if (drone.x > canvas.width) drone.x = 0
        if (drone.y < 0) drone.y = canvas.height
        if (drone.y > canvas.height) drone.y = 0

        // Add to trail
        drone.trail.push({ x: drone.x, y: drone.y, opacity: 1 })
        if (drone.trail.length > 15) {
          drone.trail.shift()
        }

        // Update trail opacity
        drone.trail.forEach((point, index) => {
          point.opacity = index / drone.trail.length
        })

        // Draw trail
        drone.trail.forEach((point, index) => {
          if (index > 0) {
            const prevPoint = drone.trail[index - 1]
            ctx.beginPath()
            ctx.moveTo(prevPoint.x, prevPoint.y)
            ctx.lineTo(point.x, point.y)
            ctx.strokeStyle = `rgba(255, 165, 0, ${point.opacity * 0.3})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

        // Draw drone body
        ctx.save()
        ctx.translate(drone.x, drone.y)
        ctx.rotate(drone.angle)

        // Glow effect
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, drone.size * 3)
        gradient.addColorStop(0, `rgba(255, 165, 0, ${drone.glowIntensity})`)
        gradient.addColorStop(0.5, `rgba(255, 165, 0, ${drone.glowIntensity * 0.3})`)
        gradient.addColorStop(1, "rgba(255, 165, 0, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(-drone.size * 3, -drone.size * 3, drone.size * 6, drone.size * 6)

        // Drone shape
        ctx.strokeStyle = "#ff6500"
        ctx.lineWidth = 1.5
        ctx.beginPath()

        // Main body (diamond)
        ctx.moveTo(0, -drone.size)
        ctx.lineTo(drone.size, 0)
        ctx.lineTo(0, drone.size)
        ctx.lineTo(-drone.size, 0)
        ctx.closePath()
        ctx.stroke()

        // Propellers
        const propSize = drone.size * 0.7
        ctx.beginPath()
        ctx.arc(-drone.size * 0.8, -drone.size * 0.8, propSize, 0, Math.PI * 2)
        ctx.arc(drone.size * 0.8, -drone.size * 0.8, propSize, 0, Math.PI * 2)
        ctx.arc(drone.size * 0.8, drone.size * 0.8, propSize, 0, Math.PI * 2)
        ctx.arc(-drone.size * 0.8, drone.size * 0.8, propSize, 0, Math.PI * 2)
        ctx.stroke()

        // Center dot
        ctx.fillStyle = "#ff6500"
        ctx.beginPath()
        ctx.arc(0, 0, 1, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()

        // Update glow intensity
        drone.glowIntensity = 0.5 + Math.sin(Date.now() * 0.003 + drone.id) * 0.3
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-20" style={{ mixBlendMode: "screen" }} />
  )
}
